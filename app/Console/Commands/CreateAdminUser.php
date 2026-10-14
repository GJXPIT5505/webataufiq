<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class CreateAdminUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:admin 
                            {--name= : Nama admin} 
                            {--email= : Email admin} 
                            {--password= : Password admin}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Buat akun Admin / Super Admin baru secara aman';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('=== Pembuatan Akun Admin SIT At-Taufiq ===');

        $name = $this->option('name') ?: $this->ask('Masukkan Nama Admin', 'Admin Attaufiq');
        $email = $this->option('email') ?: $this->ask('Masukkan Email Admin', 'admin@attaufiq.com');
        $password = $this->option('password') ?: $this->secret('Masukkan Password Admin');

        if (empty($password)) {
            $this->error('Password tidak boleh kosong!');
            return 1;
        }

        $validator = Validator::make([
            'name' => $name,
            'email' => $email,
            'password' => $password,
        ], [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            foreach ($validator->errors()->all() as $error) {
                $this->error($error);
            }
            return 1;
        }

        $user = User::updateOrCreate(
            ['email' => $email],
            [
                'name' => $name,
                'password' => Hash::make($password),
                'email_verified_at' => now(),
            ]
        );

        $this->newLine();
        $this->info('==========================================');
        $this->info(' Akun Admin Berhasil Dibuat / Diperbarui!');
        $this->info('==========================================');
        $this->line(" Name     : <comment>{$user->name}</comment>");
        $this->line(" Email    : <comment>{$user->email}</comment>");
        $this->line(" Password : <comment>{$password}</comment>");
        $this->line(" URL Login: <comment>/login</comment>");
        $this->newLine();

        return 0;
    }
}

