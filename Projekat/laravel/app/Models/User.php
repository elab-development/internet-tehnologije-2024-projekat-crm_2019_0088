<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed'
    ];

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function clients()
    {
        return $this->hasMany(Client::class, 'created_by');
    }

    public function hasRole($roleName)
    {
        // Eager load role if not loaded
        if (!$this->relationLoaded('role')) {
            $this->load('role');
        }
        return $this->role && $this->role->name === $roleName;
    }

    public function isAdmin()
    {
        return $this->hasRole('Admin');
    }

    public function isUser()
    {
        return $this->hasRole('User');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($user) {
            if (!$user->role_id) {
                $role = Role::where('name', 'User')->first();
                if ($role) {
                    $user->role_id = $role->id; // Default role is 'User'
                }
            }
        });
    }
}
