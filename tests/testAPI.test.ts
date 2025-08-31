import { test, expect } from '@playwright/test';

test('Test API', async ({ request }) => {
    const response = await request.get('https://restful-booker.herokuapp.com/booking');
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
});
