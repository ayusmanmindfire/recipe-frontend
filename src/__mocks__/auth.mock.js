export const signUpMockErrorResponse = {
    response: {
        data: { message: 'Email already exists' },
    },
};


export const signUpMockSuccessResponse = {
    data: {
        message: 'Registration successful',
    },
};

export const invalidPayload={
    username:"as",
    email:"invalid-email",
    password:"qw123"
}

export const validPayload={
    username:"spiderman",
    email:"spiderman@gmail.com",
    password:"dsasee@@sd"
}

export const mockSuccessResponse = {
    data: {
        success: true,
        message: 'Login successful',
        data: {
            token: 'mockToken123',
        },
    },
};

export const mockUserResponse = {
    data: {
        data: { name: 'Ayusman', email: 'ayus@example.com' },
    },
};

export const mockErrorResponse = {
    response: {
        data: { message: 'user not found' },
    },
};

export const userDetails={
    username: 'ayusman',
    email: 'ayusman@gmail.com',
}