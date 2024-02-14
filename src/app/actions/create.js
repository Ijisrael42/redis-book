'use server'

import { client } from "../lib/db"
import { redirect } from 'next/navigation'

export async function createBook(formData) {
  const {title, rating, author, blurb} = Object.fromEntries(formData)

  //create book id
  const id = Math.floor(Math.random() * 10000);

  //save new book
  await client.hSet(`books:${id}`, {
    title, rating, author, blurb
  })

  redirect('/')
}