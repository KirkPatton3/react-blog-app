const API_URL = 'https://jsonplaceholder.typicode.com';

async function request(path, options) {
  const response = await fetch(`${API_URL}${path}`, options);

  if (!response.ok) {
    const error = new Error(`Request to ${path} failed with status ${response.status}`);
    error.status = response.status;
    throw error;
  }

  return response.json();
}

export function getPosts() {
  return request('/posts');
}

export function getPost(postId) {
  return request(`/posts/${postId}`);
}

export function getUsers() {
  return request('/users');
}

export function getUser(userId) {
  return request(`/users/${userId}`);
}

export function getComments(postId) {
  return request(`/posts/${postId}/comments`);
}

export function createComment(postId, comment) {
  return request(`/posts/${postId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ postId: Number(postId), ...comment }),
  });
}