export interface Messages {
	success?: MessageEntity[] | null
	error?: MessageEntity[] | null
	loot?: MessageEntity[] | null
	npc?: MessageEntity[] | null
	combat?: MessageEntity[] | null
	info?: MessageEntity[] | null
	quest?: MessageEntity[] | null
}
export interface MessageEntity {
	type: string
	style: string
	text: string
}
