// WeaponSystem.cs

using System;
using UnityEngine;

public class WeaponSystem : MonoBehaviour
{
    public int damage;
    public float range;

    public void Fire()
    {
        // Logic to fire the weapon
        Debug.Log("Weapon fired!");
    }

    public void Reload()
    {
        // Logic to reload the weapon
        Debug.Log("Weapon reloaded!");
    }
}