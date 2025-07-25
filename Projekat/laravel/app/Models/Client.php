<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'company',
        'address',
        'status',
        'total_value',
        'created_by'
    ];

    protected $casts = [
        'total_value' => 'decimal:2',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }

    // Scope for filtering by creator
    public function scopeCreatedBy($query, $userId)
    {
        return $query->where('created_by', $userId);
    }

    // Scope for active clients
    public function scopeActive($query)
    {
        return $query->where('status', 'Active');
    }
}