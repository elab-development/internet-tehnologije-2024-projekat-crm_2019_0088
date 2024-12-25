<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    
    protected $policies = [
        Client::class => ClientPolicy::class,
    ];

    
    public function boot()
    {
        $this->registerPolicies();

        //
    }
}
