
# start-expo.ps1
# Run this script from anywhere: right-click > Run with PowerShell

# --- CONFIG: EDIT THESE TWO ---
$Avd        = "Pixel_4a"                 # AVD name from Android Studio
$ProjectDir = "F:\Projects\novari-mobile" # Folder containing package.json
# --------------------------------

# Find SDK automatically if possible
$Sdk = $env:ANDROID_SDK_ROOT
if (-not $Sdk) { $Sdk = "E:\Android\Sdk" }

$Adb = Join-Path $Sdk "platform-tools\adb.exe"
$Emu = Join-Path $Sdk "emulator\emulator.exe"
$AvdDir = Join-Path $env:USERPROFILE ".android\avd\$Avd.avd"

# 1) Cleanup
taskkill /IM "qemu-system-x86_64.exe" /F 2>$null
& $Adb kill-server | Out-Null
Remove-Item -Recurse -Force "$AvdDir\hardware-qemu.ini.lock" -ErrorAction SilentlyContinue
Remove-Item -Force "$AvdDir\multiinstance.lock" -ErrorAction SilentlyContinue

# 2) Start emulator
Start-Process $Emu -ArgumentList "-avd $Avd -no-snapshot-load"
Start-Sleep 5
& $Adb start-server | Out-Null

# 3) Detect emulator id + wait for boot
$max = 90
$emuId = $null

do {
  $emuId = (& $Adb devices | Select-String "emulator-\d+\s+device" | ForEach-Object { ($_ -split "\s+")[0] } | Select-Object -First 1)
  if (-not $emuId) { Start-Sleep 2 }
  $max--
} while (-not $emuId -and $max -gt 0)

if (-not $emuId) { throw "No emulator device appeared in adb devices." }

do {
  $boot = (& $Adb -s $emuId shell getprop sys.boot_completed).Trim()
  if ($boot -ne "1") { Start-Sleep 2 }
} while ($boot -ne "1")

Write-Host "Emulator ready: $emuId"

# 4) (Optional) Reverse Metro for cases where localhost matters
& $Adb -s $emuId reverse tcp:8081 tcp:8081 2>$null

# 5) Start Expo
Set-Location $ProjectDir
$env:EXPO_NO_EMULATOR = "1"
npx expo start -c

# start-expo.ps1
# Run this script from anywhere: right-click > Run with PowerShell

# --- CONFIG: EDIT THESE TWO ---
$Avd        = "Pixel_4a"                 # AVD name from Android Studio
$ProjectDir = "F:\Projects\novari-mobile" # Folder containing package.json
# --------------------------------

# Find SDK automatically if possible
$Sdk = $env:ANDROID_SDK_ROOT
if (-not $Sdk) { $Sdk = "E:\Android\Sdk" }

$Adb = Join-Path $Sdk "platform-tools\adb.exe"
$Emu = Join-Path $Sdk "emulator\emulator.exe"
$AvdDir = Join-Path $env:USERPROFILE ".android\avd\$Avd.avd"

# 1) Cleanup
taskkill /IM "qemu-system-x86_64.exe" /F 2>$null
& $Adb kill-server | Out-Null
Remove-Item -Recurse -Force "$AvdDir\hardware-qemu.ini.lock" -ErrorAction SilentlyContinue
Remove-Item -Force "$AvdDir\multiinstance.lock" -ErrorAction SilentlyContinue

# 2) Start emulator
Start-Process $Emu -ArgumentList "-avd $Avd -no-snapshot-load"
Start-Sleep 5
& $Adb start-server | Out-Null

# 3) Detect emulator id + wait for boot
$max = 90
$emuId = $null

do {
  $emuId = (& $Adb devices | Select-String "emulator-\d+\s+device" | ForEach-Object { ($_ -split "\s+")[0] } | Select-Object -First 1)
  if (-not $emuId) { Start-Sleep 2 }
  $max--
} while (-not $emuId -and $max -gt 0)

if (-not $emuId) { throw "No emulator device appeared in adb devices." }

do {
  $boot = (& $Adb -s $emuId shell getprop sys.boot_completed).Trim()
  if ($boot -ne "1") { Start-Sleep 2 }
} while ($boot -ne "1")

Write-Host "Emulator ready: $emuId"

# 4) (Optional) Reverse Metro for cases where localhost matters
& $Adb -s $emuId reverse tcp:8081 tcp:8081 2>$null

# 5) Start Expo
Set-Location $ProjectDir
$env:EXPO_NO_EMULATOR = "1"
npx expo start -c

