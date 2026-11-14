<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // Create Permissions
        $permissions = [
            'manage users',
            'manage roles',
            'manage vehicles',
            'manage drivers',
            'create booking',
            'approve booking',
            'manage maintenance',
            'view reports',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create Roles and assign permissions
        $superAdminRole = Role::firstOrCreate(['name' => 'Super Admin']);
        $superAdminRole->givePermissionTo(Permission::all());

        $adminKdoRole = Role::firstOrCreate(['name' => 'Admin KDO']);
        $adminKdoRole->givePermissionTo([
            'manage vehicles',
            'manage drivers',
            'create booking',
            'approve booking',
            'manage maintenance',
            'view reports',
        ]);

        $approverRole = Role::firstOrCreate(['name' => 'Approver']);
        $approverRole->givePermissionTo([
            'approve booking',
            'view reports',
        ]);

        $driverRole = Role::firstOrCreate(['name' => 'Driver']);
        $driverRole->givePermissionTo([
            'create booking',
        ]);

        // Create Default Super Admin
        $superAdmin = User::firstOrCreate(
            ['email' => 'admin@kdo.com'],
            [
                'name' => 'Super Administrator',
                'password' => Hash::make('password'),
            ]
        );
        $superAdmin->assignRole($superAdminRole);

        // Create Default Admin KDO
        $adminKdo = User::firstOrCreate(
            ['email' => 'adminkdo@kdo.com'],
            [
                'name' => 'Admin KDO',
                'password' => Hash::make('password'),
            ]
        );
        $adminKdo->assignRole($adminKdoRole);

        // Create Default Approver
        $approver = User::firstOrCreate(
            ['email' => 'approver@kdo.com'],
            [
                'name' => 'Pejabat Penyetuju',
                'password' => Hash::make('password'),
            ]
        );
        $approver->assignRole($approverRole);

        // Create Default Driver
        $driver = User::firstOrCreate(
            ['email' => 'driver@kdo.com'],
            [
                'name' => 'Driver Operasional',
                'password' => Hash::make('password'),
            ]
        );
        $driver->assignRole($driverRole);
    }
}
