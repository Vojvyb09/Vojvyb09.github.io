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

    // Hledání uživatele v databázi podle uživatelského jména
    $sql = "SELECT * FROM users WHERE username='$username'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Uživatel nalezen, porovnání hesel
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            // Přihlášení úspěšné
            echo "Přihlášení bylo úspěšné!";
        } else {
            echo "Chybné heslo!";
        }
    } else {
        echo "Uživatel neexistuje!";
    }

    $conn->close();
}
?>
