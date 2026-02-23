using UnityEngine;

public class CarMovement : MonoBehaviour {
    public float acceleration = 10f;
    public float turnSpeed = 100f;
    public float boostMultiplier = 2f;
    public float maxSpeed = 20f;
    private float currentSpeed = 0f;
    private Rigidbody2D rb;

    void Start() {
        rb = GetComponent<Rigidbody2D>();
    }

    void Update() {
        HandleInput();
    }

    void HandleInput() {
        // Acceleration
        if (Input.GetKey(KeyCode.W)) {
            currentSpeed += acceleration * Time.deltaTime;
            currentSpeed = Mathf.Clamp(currentSpeed, 0, maxSpeed);
        }

        // Braking
        if (Input.GetKey(KeyCode.S)) {
            currentSpeed -= acceleration * Time.deltaTime * 1.5f;
            currentSpeed = Mathf.Clamp(currentSpeed, 0, maxSpeed);
        }

        // Boosting
        if (Input.GetKey(KeyCode.Space)) {
            currentSpeed *= boostMultiplier;
        }

        // Turning
        float turn = Input.GetAxis("Horizontal");
        transform.Rotate(0, 0, -turn * turnSpeed * Time.deltaTime);
    }

    void FixedUpdate() {
        rb.velocity = transform.up * currentSpeed;
    }
}