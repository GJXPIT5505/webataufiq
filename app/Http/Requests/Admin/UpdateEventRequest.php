<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateEventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // Ambil instance atau ID event dari parameter route
        $event = $this->route('event');
        $eventId = $event instanceof \App\Models\Event ? $event->id : $event;

        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique('events', 'slug')->ignore($eventId),
            ],
            'type' => ['required', 'in:event,program'],
            'description' => ['nullable', 'string', 'max:500'],
            'content' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
            'icon_type' => ['nullable', 'string', 'max:100'],
            'is_active' => ['boolean'],

            // Aturan untuk Multi-Upload Slider Gallery
            'gallery' => ['nullable', 'array'],
            'gallery.*' => ['image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
        ];
    }
}