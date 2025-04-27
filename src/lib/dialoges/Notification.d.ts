export interface Notification {
	notes?: NotesEntity[] | null
}
export interface NotesEntity {
	type?: string | null
	style?: string | null
	text: string
	id?: string | null
}
