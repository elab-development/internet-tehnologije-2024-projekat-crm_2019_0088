<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $table = 'clients';
    protected $fillable = [
        'name', 
        'email', 
        'phone', 
        'company',
        'created_by'
    ];
    public function contacts()
    {
        return $this->hasMany(Contact::class);
    }
    public function invoices(){
        return $this->hasMany(Invoice::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    public function scopeByUser($query, $userId)
    {
    return $query->where('created_by', $userId);
    }


}
