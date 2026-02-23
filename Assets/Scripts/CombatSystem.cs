using UnityEngine;
using System.Collections.Generic;

/// <summary>
/// نظام القتال الأساسي للعبة
/// يدير الضربات والأضرار والكومبو
/// </summary>
public class CombatSystem : MonoBehaviour
{
    [Header("Combat Stats")]
    [SerializeField] private float baseDamage = 10f;
    [SerializeField] private float comboMultiplier = 1.5f;
    [SerializeField] private float comboCooldown = 3f;
    [SerializeField] private int maxComboHits = 5;
    
    private int currentComboCount = 0;
    private float lastHitTime = 0f;
    private bool isComboActive = false;
    
    [Header("References")]
    private PlayerHealth playerHealth;
    private List<CombatMove> availableMoves = new List<CombatMove>();
    
    private void Start()
    {
        playerHealth = GetComponent<PlayerHealth>();
        InitializeCombatMoves();
    }
    
    private void Update()
    {
        UpdateComboState();
    }
    
    /// <summary>
    /// تنفيذ هجوم أساسي
    /// </summary>
    public void PerformAttack(CombatMove move)
    {
        float damage = CalculateDamage(move);
        ApplyCombo(ref damage);
        
        Debug.Log($"Attack performed: {move.name} | Damage: {damage} | Combo: {currentComboCount}");
    }
    
    /// <summary>
    /// حساب الضرر بناءً على الحركة والإحصائيات
    /// </summary>
    private float CalculateDamage(CombatMove move)
    {
        return baseDamage * move.damageMultiplier;
    }
    
    /// <summary>
    /// تطبيق نظام الكومبو على الضرر
    /// </summary>
    private void ApplyCombo(ref float damage)
    {
        if (isComboActive)
        {
            currentComboCount++;
            if (currentComboCount > maxComboHits)
                currentComboCount = maxComboHits;
            
            damage *= (1f + (currentComboCount * 0.2f)); // كل ضربة تزيد الضرر بـ 20%
        }
        else
        {
            currentComboCount = 1;
            isComboActive = true;
        }
        
        lastHitTime = Time.time;
    }
    
    /// <summary>
    /// ت��ديث حالة الكومبو
    /// </summary>
    private void UpdateComboState()
    {
        if (isComboActive && Time.time - lastHitTime > comboCooldown)
        {
            ResetCombo();
        }
    }
    
    /// <summary>
    /// إعادة تعيين الكومبو
    /// </summary>
    public void ResetCombo()
    {
        currentComboCount = 0;
        isComboActive = false;
    }
    
    /// <summary>
    /// إحداث ضرر للخصم
    /// </summary>
    public void DealDamage(float damage, GameObject target)
    {
        PlayerHealth targetHealth = target.GetComponent<PlayerHealth>();
        if (targetHealth != null)
        {
            targetHealth.TakeDamage(damage);
        }
    }
    
    /// <summary>
    /// تهيئة حركات القتال المتاحة
    /// </summary>
    private void InitializeCombatMoves()
    {
        availableMoves.Add(new CombatMove("Light Attack", 1f, 0.5f));
        availableMoves.Add(new CombatMove("Heavy Attack", 2f, 1f));
        availableMoves.Add(new CombatMove("Kick", 1.5f, 0.7f));
        availableMoves.Add(new CombatMove("Special Attack", 3f, 2f));
    }
    
    public int GetComboCount() => currentComboCount;
    public bool IsComboActive() => isComboActive;
}

/// <summary>
/// فئة تمثل حركة قتالية
/// </summary>
public class CombatMove
{
    public string name;
    public float damageMultiplier;
    public float cooldown;
    
    public CombatMove(string name, float damageMultiplier, float cooldown)
    {
        this.name = name;
        this.damageMultiplier = damageMultiplier;
        this.cooldown = cooldown;
    }
}