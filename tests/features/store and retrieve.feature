Feature: Store and retrieve key-value pairs
  It should be possible to store key-value pairs and
  later retrieve them easily and reliably.

  Scenario Outline: Keys with primitive values
    When I store <Key>=<Value> in the database
    Then I can verify that <Key>=<Value> is in the database
    Examples:
      | Key   | Value  |
      | hello | world  |
      | abc   | 2      |
      | acme  | 3.14   |
      | other | true   |

  Scenario Outline: Arrays as values
    When I store <Key>=<Value> in the database
    Then I can verify that <Key>=<Value> is in the database
    Examples:
      | Key   | Value                       |
      | hello | [ 'world', 2, 3.14, true ]  |
      | abc   | [ 2, 3, 4, 5 ]              |
      | acme  | [ 3.14, 1.23 ]              |
      | other | [ true, false ]             |

  Scenario Outline: Objects as values
    When I store <Key>=<Value> in the database
    Then I can verify that <Key>=<Value> is in the database
    Examples:
      | Key  | Value             |
      | user | { name: 'john' }  |
      | org  | { id: 123 }       |
      | mike | { name: 'mike' }  |
