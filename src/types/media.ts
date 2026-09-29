export type MediaStatus = 'uploading' | 'ready' | 'failed'

export type Media = {
  id: string
  user_id: string
  file_name: string
  storage_path: string
  mime_type: string | null
  file_size: number | null
  duration_seconds: number | null
  status: MediaStatus
  created_at: string
  updated_at: string
}

export type CreatedMedia = Pick<Media, 'id' | 'storage_path'>
