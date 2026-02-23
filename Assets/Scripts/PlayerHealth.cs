using System;

public class PlayerHealth
{
    public int Health { get; private set; } = 100;
    public int Shield { get; private set; } = 50;

    // Method to take damage
    public void TakeDamage(int damage)
    {
        if (Shield > 0)
        {
            Shield -= damage;
            if (Shield < 0)
            {
                Health += Shield; // Shield is depleted, apply remaining damage to health
                Shield = 0;
            }
        }
        else
        {
            Health -= damage;
        }
        
        // Ensure health does not go below 0
        if (Health < 0)
        {
            Health = 0;
        }
    }
    
    // Method to heal the player
    public void Heal(int amount)
    {
        Health += amount;
        if (Health > 100)
        {
            Health = 100; // Cap health at 100
        }
    }
    
    // Method to recharge shield
    public void RechargeShield(int amount)
    {
        Shield += amount;
        if (Shield > 50)
        {
            Shield = 50; // Cap shield at 50
        }
    }
}