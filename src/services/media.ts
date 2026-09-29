import { getSupabase } from '../lib/supabase'
import { validateVideoFile } from '../lib/mediaValidation'
import type { CreatedMedia } from '../types/media'

function errorMessage(cause: unknown): string {
  return cause instanceof Error ? cause.message : 'Erro desconhecido.'
}

async function cleanUpFailedUpload(media: CreatedMedia): Promise<string[]> {
  const supabase = getSupabase()
  const warnings: string[] = []

  try {
    const { error } = await supabase.storage.from('media').remove([media.storage_path])
    if (error) throw error
  } catch (cause) {
    warnings.push(`Não foi possível limpar o arquivo: ${errorMessage(cause)}`)
  }

  try {
    const { error } = await supabase.from('media')
      .update({ status: 'failed' })
      .eq('id', media.id)
      .select('id')
      .single()
    if (error) throw error
  } catch (cause) {
    warnings.push(`Não foi possível confirmar o status failed: ${errorMessage(cause)}`)
  }

  return warnings
}

export async function uploadVideo(file: File): Promise<CreatedMedia> {
  const validationError = validateVideoFile(file)
  if (validationError) throw new Error(validationError)

  const supabase = getSupabase()
  const { data, error: insertError } = await supabase.from('media')
    .insert({
      file_name: file.name,
      mime_type: file.type.toLowerCase(),
      file_size: file.size,
      status: 'uploading',
    })
    .select('id, storage_path')
    .single()
  if (insertError) throw new Error(`Não foi possível criar o registro da mídia: ${insertError.message}`)
  if (!data?.id || !data.storage_path) {
    throw new Error('O banco não retornou o ID e o caminho do arquivo. Verifique o registro antes de tentar novamente.')
  }
  const media: CreatedMedia = { id: data.id, storage_path: data.storage_path }

  try {
    const { error } = await supabase.storage.from('media')
      .upload(media.storage_path, file, { contentType: file.type.toLowerCase(), upsert: false })
    if (error) throw error
  } catch (cause) {
    const warnings = await cleanUpFailedUpload(media)
    throw new Error(`Falha no upload: ${errorMessage(cause)}${warnings.length ? ` ${warnings.join(' ')}` : ' O registro foi marcado como failed.'}`)
  }

  try {
    const { error } = await supabase.from('media')
      .update({ status: 'ready' })
      .eq('id', media.id)
      .select('id')
      .single()
    if (error) throw error
  } catch (cause) {
    const warnings = await cleanUpFailedUpload(media)
    throw new Error(`O arquivo foi enviado, mas não foi possível confirmar o status ready: ${errorMessage(cause)}${warnings.length ? ` ${warnings.join(' ')}` : ' O arquivo foi removido e o registro marcado como failed.'}`)
  }

  return media
}
