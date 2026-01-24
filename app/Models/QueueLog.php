<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QueueLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'queue_id',
        'step_id',
        'updated_by',
        'remarks',
        'action'
    ];

    public function queue()
    {
        return $this->belongsTo(Queue::class);
    }

    public function step()
    {
        return $this->belongsTo(ServiceStep::class, 'step_id');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
