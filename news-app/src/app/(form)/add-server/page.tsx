import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export default function AddNews() {
  async function handleSubmit(formData: FormData) {
    'use server';
    const rawFormData = {
      title: formData.get('title'),
      description: formData.get('description'),
      poster: formData.get('poster'),
    };

    const res = await fetch('http://localhost:3001/news', {
      method: 'POST',
      body: JSON.stringify(rawFormData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Error submit data');
    }

    revalidatePath('/');
    redirect('/');
  }

  return (
    <div className="container max-w-2xl mx-auto">
      <h1 className="text-4xl font-semibold text-center py-5">
        Add News - Server
      </h1>
      <form action={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-lg font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="border border-gray-300 rounded-md p-2 dark:bg-zinc-900 dark:text-white dark:border-gray-700"
          />
          <label htmlFor="description" className="text-lg font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="border border-gray-300 rounded-md p-2 dark:bg-zinc-900 dark:text-white dark:border-gray-700"
          />
          <label htmlFor="poster" className="text-lg font-medium">
            Image URL
          </label>
          <input
            type="text"
            id="poster"
            name="poster"
            className="border border-gray-300 rounded-md p-2 dark:bg-zinc-900 dark:text-white dark:border-gray-700"
          />
          <button
            type="submit"
            className="bg-black dark:bg-white dark:text-black text-white px-4 py-2 rounded-md mt-10"
          >
            Add News
          </button>
        </div>
      </form>
    </div>
  );
}
