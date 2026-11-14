<?php

namespace Tests\Feature;

use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * Test root route redirects unauthenticated guest to login.
     */
    public function test_the_application_redirects_unauthenticated_guests(): void
    {
        $response = $this->get('/');

        $response->assertRedirect('/login');
    }
}
