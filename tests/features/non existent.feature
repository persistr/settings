Feature: Access values that don't exist
  Accessing values that don't exist should return undefined.

  Scenario Outline: Empty database
    Given empty database
    Then I can verify that <Key> is NOT in the database
    Examples:
      | Key   |
      | hello |
      | abc   |
      | acme  |
      | other |
