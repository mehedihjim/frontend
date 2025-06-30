'use server'

import { cookies } from 'next/headers'
type CookieType = {
    name: string
    value: string
    httpOnly: boolean
    path: string

}
async function createCookie({ name, value, httpOnly, path }: CookieType) {

    cookies().set({
        name,
        value,
        httpOnly,
        path
    })
}

export { createCookie}