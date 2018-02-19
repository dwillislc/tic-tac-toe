POST https://rest.iad-01.braze.com/users/track
Content-Type: application/json

{
   "app_group_id" : (required, string) see App Group Identifier below,
   "attributes" : (optional, array of Attributes Object),
   "events" : (optional, array of Event Object),
   "purchases" : (optional, array of Purchase Object)
}