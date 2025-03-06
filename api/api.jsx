const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Get all posts
export const getPosts = async () => {
  const res = await fetch(API_URL);
  return await res.json();
};

// Create a new post
export const toPost = async (newPostData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPostData),
  });
  return await res.json();
};

// Update an existing post
export const UpdateUser = async (id, updatedData) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  return await res.json();
};

// Delete a post
export const DeleteUser = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return res.ok;
};
