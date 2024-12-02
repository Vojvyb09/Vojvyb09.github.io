<?php
// Připojení k databázi
$servername = "localhost";
$username = "root"; // Uživatelské jméno pro připojení k databázi
$password = ""; // Heslo pro připojení k databázi
$dbname = "weblab"; // Název databáze

$conn = new mysqli($servername, $username, $password, $dbname);

// Kontrola připojení
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Kontrola, zda byly odeslány údaje
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Šifrování hesla pomocí bcrypt
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    // Uložení uživatele do databáze
    $sql = "INSERT INTO users (username, password) VALUES ('$username', '$hashedPassword')";

    if ($conn->query($sql) === TRUE) {
        echo "Registrace byla úspěšná!";
    } else {
        echo "Chyba: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>
