'use server'

import { client } from "../lib/db"
import { redirect } from 'next/navigation'

export async function createBook(formData) {
  const {title, rating, author, blurb} = Object.fromEntries(formData)

  //create book id
  const id = Math.floor(Math.random() * 10000);

  //add book title to the sorted set
  const unique = await client.zAdd('books', {
    value: title,
    score: id,
  }, { NX: true})

  if (!unique) {
    return {error: 'That has already been added'}
  }

  //save new book
  await client.hSet(`books:${id}`, {
    title, rating, author, blurb
  })

  redirect('/')
}