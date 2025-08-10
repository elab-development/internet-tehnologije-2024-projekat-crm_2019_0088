<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
        'company',
        'phone'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'string'
    ];

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function clients()
    {
        return $this->hasMany(Client::class, 'created_by');
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class, 'created_by');
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

    public function isClient()
    {
        return $this->hasRole('Client');
    }

    // Check if user can create clients/invoices
    public function canCreate()
    {
        return $this->isAdmin();
    }

    // Check if user can edit clients/invoices
    public function canEdit()
    {
        return $this->isAdmin();
    }

    // Check if user can delete clients/invoices
    public function canDelete()
    {
        return $this->isAdmin();
    }

    // Check if user can view all data or only their own
    public function canViewAll()
    {
        return $this->isAdmin();
    }

    // Get accessible menu items based on role
    public function getAccessibleMenuItems()
    {
        $baseItems = [
            [
                'id' => 'dashboard',
                'label' => 'Overview',
                'path' => '/dashboard',
                'icon' => 'BarChart3'
            ],
            [
                'id' => 'settings',
                'label' => 'Settings',
                'path' => '/settings',
                'icon' => 'Settings'
            ]
        ];

        if ($this->isAdmin() || $this->isClient()) {
            $baseItems[] = [
                'id' => 'clients',
                'label' => 'Clients',
                'path' => '/clients',
                'icon' => 'Users'
            ];
            $baseItems[] = [
                'id' => 'invoice',
                'label' => 'Invoices',
                'path' => '/invoice',
                'icon' => 'FileText'
            ];
        }

        return $baseItems;
    }

    // Update password
    public function updatePassword($newPassword)
    {
        $this->update([
            'password' => Hash::make($newPassword)
        ]);
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