'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { revalidate } from './action';

export default function AddNews() {
  const router = useRouter();

  const [formData, setFormData] = useState<NewsForm>({
    title: '',
    description: '',
    poster: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch('http://localhost:3001/news', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Error submit data');
    }

    revalidate();
    router.push('/');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className="container max-w-2xl mx-auto">
      <h1 className="text-4xl font-semibold text-center py-5">
        Add News - Client
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-lg font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 dark:bg-zinc-900 dark:text-white dark:border-gray-700"
          />
          <label htmlFor="description" className="text-lg font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 dark:bg-zinc-900 dark:text-white dark:border-gray-700"
          />
          <label htmlFor="poster" className="text-lg font-medium">
            Image URL
          </label>
          <input
            type="text"
            id="poster"
            name="poster"
            value={formData.poster}
            onChange={handleChange}
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
