declare module Stores {
  interface user {
    name: string
    age: number | null
    sex?: 'male' | 'female' | 'unknown'
    token?: string
  }
}