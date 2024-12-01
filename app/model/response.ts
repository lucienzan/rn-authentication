type responseData = {
  error: boolean,
  code: number,
  data?: authState,
  message: string
}

type authState = {
  authenticated: boolean | null;
  verified: boolean | null | undefined;
  isSendVerified?: boolean,
  email?: string
}

export {
  responseData,
  authState
}