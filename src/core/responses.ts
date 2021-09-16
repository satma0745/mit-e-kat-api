interface ISuccessResponse<TPayload> {
  success: true
  payload: TPayload
}
const success = <TPayload = null>(payload: TPayload = null): ISuccessResponse<TPayload> => ({
  success: true,
  payload: payload,
})

interface IConflictErrorResponse {
  issue: 'conflict'
}
const conflict = (): IConflictErrorResponse => ({ issue: 'conflict' })

interface INotFoundErrorResponse {
  issue: 'not-found'
}
const notFound = (): INotFoundErrorResponse => ({ issue: 'not-found' })

export { success, conflict, notFound }
export { ISuccessResponse, IConflictErrorResponse, INotFoundErrorResponse }
