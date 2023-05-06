export type Assigment = {
  "version": "0.1.0",
  "name": "assigment",
  "instructions": [
    {
      "name": "inout",
      "accounts": [
        {
          "name": "key",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "inout",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "InOutArgs"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "inOut",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "key",
            "type": "publicKey"
          },
          {
            "name": "wallet",
            "type": "publicKey"
          },
          {
            "name": "inputOne",
            "type": "i64"
          },
          {
            "name": "inputTwo",
            "type": "i64"
          },
          {
            "name": "operator",
            "type": {
              "defined": "Operations"
            }
          },
          {
            "name": "output",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "InOutArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "inputOne",
            "type": "i64"
          },
          {
            "name": "inputTwo",
            "type": "i64"
          },
          {
            "name": "operator",
            "type": {
              "defined": "Operations"
            }
          }
        ]
      }
    },
    {
      "name": "Operations",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Add"
          },
          {
            "name": "Sub"
          },
          {
            "name": "Mul"
          },
          {
            "name": "Div"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "SubtractionError",
      "msg": "Subtraction Error The first number must be greater than the second number"
    },
    {
      "code": 6001,
      "name": "DivisionError",
      "msg": "Division Error The second number must be greater than 0"
    },
    {
      "code": 6002,
      "name": "DivisionInvalidResult",
      "msg": "Division Error The result must be greater than 0"
    }
  ]
};

export const IDL: Assigment = {
  "version": "0.1.0",
  "name": "assigment",
  "instructions": [
    {
      "name": "inout",
      "accounts": [
        {
          "name": "key",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "inout",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "InOutArgs"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "inOut",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "key",
            "type": "publicKey"
          },
          {
            "name": "wallet",
            "type": "publicKey"
          },
          {
            "name": "inputOne",
            "type": "i64"
          },
          {
            "name": "inputTwo",
            "type": "i64"
          },
          {
            "name": "operator",
            "type": {
              "defined": "Operations"
            }
          },
          {
            "name": "output",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "InOutArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "inputOne",
            "type": "i64"
          },
          {
            "name": "inputTwo",
            "type": "i64"
          },
          {
            "name": "operator",
            "type": {
              "defined": "Operations"
            }
          }
        ]
      }
    },
    {
      "name": "Operations",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Add"
          },
          {
            "name": "Sub"
          },
          {
            "name": "Mul"
          },
          {
            "name": "Div"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "SubtractionError",
      "msg": "Subtraction Error The first number must be greater than the second number"
    },
    {
      "code": 6001,
      "name": "DivisionError",
      "msg": "Division Error The second number must be greater than 0"
    },
    {
      "code": 6002,
      "name": "DivisionInvalidResult",
      "msg": "Division Error The result must be greater than 0"
    }
  ]
};
