export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const productService = {
  async getAllProducts() {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  async getProduct(id: string) {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  async createProduct(data: any) {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create product');
    return response.json();
  },

  async updateProduct(id: string, data: any) {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update product');
    return response.json();
  },

  async deleteProduct(id: string) {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete product');
    return response.json();
  }
};

export const categoryService = {
  async getAllCategories() {
    const response = await fetch(`${API_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  },

  async getCategory(id: string) {
    const response = await fetch(`${API_URL}/categories/${id}`);
    if (!response.ok) throw new Error('Failed to fetch category');
    return response.json();
  },

  async createCategory(data: { name: string; description?: string }) {
    const response = await fetch(`${API_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create category');
    return response.json();
  },

  async updateCategory(
    id: string,
    data: { name?: string; description?: string }
  ) {
    const response = await fetch(`${API_URL}/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update category');
    return response.json();
  },

  async deleteCategory(id: string) {
    const response = await fetch(`${API_URL}/categories/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete category');
    return response.status === 204 ? null : response.json();
  }
};

export const userService = {
  async register(data: {
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender: 'Male' | 'Female' | 'Other';
    region: string;
    province: string;
    city: string;
    barangay: string;
    password: string;
  }) {
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to register user');
    }
    return response.json();
  },

  async login(data: { email: string; password: string }) {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to login');
    }
    return response.json();
  },

  async getAllUsers() {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  async deleteUser(id: number) {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete user');
    return response.json();
  },

  async updateUser(id: number, data: any) {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update user');
    return response.json();
  },

  async verifyEmail(token: string) {
    const response = await fetch(
      `${API_URL}/users/verify-email/verify?token=${token}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to verify email');
    }
    return response.json();
  }
};

export const applicationService = {
  async submitApplication(data: any) {
    const formData = new FormData();

    // Append all form fields
    Object.keys(data).forEach(key => {
      if (key !== 'profilePicture') {
        formData.append(key, data[key]);
      }
    });

    // Append profile picture if exists
    if (data.profilePicture) {
      formData.append('profilePicture', data.profilePicture);
    }

    const response = await fetch(`${API_URL}/applications`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to submit application');
    }
    return response.json();
  },

  async checkExistingApplication(userId: number) {
    const response = await fetch(`${API_URL}/applications/check/${userId}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null; // No existing application
      }
      throw new Error('Failed to check application');
    }
    return response.json();
  },

  async getAllApplications() {
    const response = await fetch(`${API_URL}/applications`);
    if (!response.ok) throw new Error('Failed to fetch applications');
    return response.json();
  },

  async getApplication(id: string) {
    const response = await fetch(`${API_URL}/applications/${id}`);
    if (!response.ok) throw new Error('Failed to fetch application');
    return response.json();
  },

  async updateApplication(id: string, data: any) {
    const formData = new FormData();

    Object.keys(data).forEach(key => {
      if (key !== 'profilePicture') {
        formData.append(key, data[key]);
      }
    });

    if (data.profilePicture) {
      formData.append('profilePicture', data.profilePicture);
    }

    const response = await fetch(`${API_URL}/applications/${id}`, {
      method: 'PUT',
      body: formData
    });

    if (!response.ok) throw new Error('Failed to update application');
    return response.json();
  },

  async deleteApplication(id: string) {
    const response = await fetch(`${API_URL}/applications/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete application');
    return response.json();
  },

  async getUserApplication(userId: number) {
    const response = await fetch(`${API_URL}/applications/user/${userId}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch user application');
    }
    return response.json();
  },

  async updateApplicationStatus(id: string, status: string) {
    const response = await fetch(`${API_URL}/applications/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    });

    if (!response.ok) throw new Error('Failed to update application status');
    return response.json();
  }
};
