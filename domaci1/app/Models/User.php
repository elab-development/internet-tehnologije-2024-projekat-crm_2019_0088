<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
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
    ];


    public function role()
    {
    return $this->belongsTo(Role::class);
    }
    public function clients()
    {
    return $this->hasMany(Client::class,'created_by');
    }
    public function hasRole($roleName)
    {
    return $this->role && $this->role->name === $roleName;
    }
protected static function boot()
{
    parent::boot();

    static::creating(function ($user) {
        if (!$user->role_id) {
            $user->role_id = Role::where('name', 'User')->first()->id; // Podrazumevana uloga je 'User'
        }
    });
}

}
