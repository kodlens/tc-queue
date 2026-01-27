<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Queue extends Model
{
    use HasFactory;

    protected $fillable = [
        'queue_number',
        'client_name',
        'requesting_office',
        'reference_no',
        'service_id',
        'current_step_id',
        'status',
        'completed_at',
        'claimed_at'
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function currentStep()
    {
        return $this->belongsTo(ServiceStep::class, 'current_step_id');
    }


    public function serviceSteps()
    {
        return $this->hasMany(ServiceStep::class, 'service_id', 'service_id')
            ->orderBy('step_order', 'asc');
    }

    public function logs()
    {
        return $this->hasMany(QueueLog::class);
    }

}
