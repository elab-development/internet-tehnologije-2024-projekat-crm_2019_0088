<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Client extends Model
{   

    use HasFactory, SoftDeletes;

    protected $table = 'clients';
    protected $fillable = [
        'name','email','phone','company','created_by'
    ] ;

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];
    protected $with = ['contacts', 'invoices', 'user'];

    public function contacts()
    {
        return $this->hasMany(Contact::class)->orderBy('contact_name');
    }
    public function invoices(){
        return $this->hasMany(Invoice::class)->orderBy('created_at','desc');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    public function scopeByUser($query, $userId)
    {
    return $query->where('created_by', $userId);
    }
    public function scopeActive($query)
    {
        return $query->whereHas('invoices', function($q) {
            $q->where('status', '!=', 'paid');
        });
    }


}