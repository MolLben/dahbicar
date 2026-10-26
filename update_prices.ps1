## Complete fleet update: prices + remove unlisted cars + add missing cars
## Uses depth-aware parsing so card boundaries are found correctly.

$carsFile  = "c:\Users\Administrator\Desktop\dahbi\cars.html"
$indexFile = "c:\Users\Administrator\Desktop\dahbi\index.html"

$carsText  = [System.IO.File]::ReadAllText($carsFile,  [System.Text.Encoding]::UTF8)
$indexText = [System.IO.File]::ReadAllText($indexFile, [System.Text.Encoding]::UTF8)

Write-Host "Loaded. cars.html=$($carsText.Length) chars  index.html=$($indexText.Length) chars"

# ============================================================================
# USER'S PRICE LIST  (name-as-on-site => new price)
# ============================================================================
$priceLookup = @{
    "Hyundai Tucson"      = 350
    "Hyundai Creta"       = 350    # new
    "Volkswagen T-Roc"    = 400
    "Volkswagen Golf 8"   = 450
    "Kia Sportage"        = 350
    "Peugeot 2008"        = 400    # new
    "Peugeot 508"         = 400    # new
    "Renault Arkana"      = 350    # new
    "Volkswagen Tiguan"   = 450    # new
    "Dacia Logan"         = 250
    "Dacia Logan BVA"     = 300
    "Dacia Sandero"       = 250    # new (manual)
    "Dacia Sandero BVA"   = 300    # new (auto)
    "Dacia Duster 4x4"    = 350    # auto — already on site
    "Dacia Duster"        = 300    # new (manual)
    "Renault Clio 5"      = 250
    "Renault Clio 5 BVA"  = 300
    "Hyundai i10"         = 300
    "Hyundai i20"         = 300    # new
    "Peugeot 208"         = 300    # auto (already on site)
    "Opel Corsa"          = 250    # new (manual)
    "Opel Corsa BVA"      = 300    # new (auto)
    "Hyundai Accent"      = 250
    "Fiat 500 Cabriolet"  = 300
}

# Manual Peugeot 208 variant handled separately (same h3 "Peugeot 208", price 250)
# Manual Peugeot 208 will be a new card we add.

# ============================================================================
# HELPER: depth-aware search for car card boundaries
# Returns list of [startIndex, endIndex, carName] for every car-card in text
# ============================================================================
function Get-CarCards {
    param([string]$Text)
    $cards = [System.Collections.Generic.List[object]]::new()
    $marker = '<div class="car-card"'
    $pos = 0
    while ($true) {
        $start = $Text.IndexOf($marker, $pos)
        if ($start -lt 0) { break }
        # Walk forward counting <div and </div to find matching close
        $depth = 0
        $i = $start
        $len = $Text.Length
        while ($i -lt $len) {
            if ($Text[$i] -eq '<') {
                if ($i + 4 -lt $len -and $Text.Substring($i, 5) -eq '<div ') {
                    $depth++
                    $i += 5
                    continue
                }
                if ($i + 5 -lt $len -and $Text.Substring($i, 6) -eq '</div>') {
                    $depth--
                    if ($depth -eq 0) {
                        $end = $i + 6   # exclusive
                        # Skip trailing \r\n
                        while ($end -lt $len -and ($Text[$end] -eq "`r" -or $Text[$end] -eq "`n")) { $end++ }
                        # Extract car name from <h3>...</h3>
                        $block = $Text.Substring($start, $end - $start)
                        $h3Match = [regex]::Match($block, '<h3>([^<]+)</h3>')
                        $name = if ($h3Match.Success) { $h3Match.Groups[1].Value } else { "(unknown)" }
                        $cards.Add([pscustomobject]@{ Start=$start; End=$end; Name=$name; Block=$block })
                        $pos = $end
                        break
                    }
                    $i += 6
                    continue
                }
            }
            $i++
        }
        if ($i -ge $len) { break }
    }
    return $cards
}

# ============================================================================
# HELPER: update price inside a single card block
# ============================================================================
function Update-BlockPrice {
    param([string]$Block, [string]$Name, [int]$OldPrice, [int]$NewPrice)
    $en = [regex]::Escape($Name)

    # data-price
    $Block = $Block -replace "data-price=""$OldPrice""", "data-price=""$NewPrice"""
    # displayed amount
    $Block = $Block -replace "$OldPrice&nbsp;MAD", "$NewPrice&nbsp;MAD"
    # WhatsApp URL price (%20OLD%20MAD or %20OLD%C2%A0MAD)
    $Block = $Block -replace "%20$OldPrice%(?:20|C2%A0)MAD", "%20$NewPrice%20MAD"

    return $Block
}

# ============================================================================
# NEW CAR CARD HTML GENERATOR
# ============================================================================
function New-CarCard {
    param(
        [string]$Name, [string]$Brand, [string]$Model,
        [int]$Price, [string]$Cat, [string]$CatColor,
        [string]$Trans, [string]$Fuel, [string]$Seats = "5",
        [string]$Image = "images/logo.png"
    )
    $encodedName = [uri]::EscapeDataString($Name)
    $waText = "Bonjour%2C%20je%20souhaite%20r%C3%A9server%20le%20${encodedName}%20%C3%A0%20${Price}%20MAD/jour.%20Pouvez-vous%20me%20confirmer%20la%20disponibilit%C3%A9%20%3F"
    $Acc = [char]0x00C0   # À
    $eac = [char]0x00E9   # é

    return @"
    <div class="car-card" data-category="$Cat" data-price="$Price">
      <div class="car-img-wrap">
        <img src="$Image" alt="Location $Name ${Acc} Casablanca ${[char]0x2014} Dahbi Cars" loading="lazy" />
        <span class="badge-cat" style="background:$CatColor">$Cat</span>
      </div>
      <div class="car-body">
        <div class="car-title-row">
          <h3>$Name</h3>
          <p class="car-subtitle">$Brand $Model</p>
        </div>
        <div class="car-specs">
          <span class="spec-item"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="spec-icon" aria-hidden="true">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <path d="M16 3.128a4 4 0 0 1 0 7.744" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <circle cx="9" cy="7" r="4" />
            </svg>${Seats} places</span>
          <span class="spec-item"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="spec-icon" aria-hidden="true">
              <path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5" />
              <path d="M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16" />
              <path d="M2 21h13" />
              <path d="M3 9h11" />
            </svg>${Fuel}</span>
          <span class="spec-item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="spec-icon"
              aria-hidden="true">
              <circle cx="4" cy="4" r="2" /><circle cx="12" cy="4" r="2" /><circle cx="20" cy="4" r="2" />
              <circle cx="7" cy="20" r="2" /><circle cx="17" cy="20" r="2" />
              <line x1="4" y1="6" x2="4" y2="13" /><line x1="12" y1="6" x2="12" y2="13" />
              <line x1="20" y1="6" x2="20" y2="13" /><line x1="4" y1="13" x2="20" y2="13" />
              <line x1="7" y1="13" x2="7" y2="18" /><line x1="17" y1="13" x2="17" y2="18" />
            </svg>${Trans}</span>
        </div>
        <div class="car-footer">
          <div class="car-price">
            <span class="from">${Acc} partir de</span>
            <span class="amount">${Price}&nbsp;MAD</span>
            <span class="per">/jour</span>
          </div>
          <div class="car-actions">
            <a href="https://wa.me/212669423763?text=$waText"
              target="_blank" rel="noopener noreferrer" class="btn-wa"><svg class="wa-icon" viewBox="0 0 24 24"
                fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>WhatsApp</a>
            <a href="cars.html" class="btn-details">D${eac}tails</a>
          </div>
        </div>
      </div>
    </div>
"@
}

# ============================================================================
# STEP 1: Parse all car cards from cars.html
# ============================================================================
Write-Host "`n=== Parsing car cards ==="
$cards = Get-CarCards -Text $carsText
Write-Host "  Found $($cards.Count) car cards"
$cards | ForEach-Object { Write-Host "    $($_.Name)" }

# Cars to keep (those in price list, using exact h3 names on site)
$keepNames = @(
    "Hyundai Tucson", "Hyundai Creta", "Volkswagen T-Roc", "Volkswagen Golf 8",
    "Kia Sportage", "Peugeot 2008", "Peugeot 508", "Renault Arkana", "Volkswagen Tiguan",
    "Dacia Logan", "Dacia Logan BVA", "Dacia Sandero", "Dacia Sandero BVA",
    "Dacia Duster 4x4", "Dacia Duster",
    "Renault Clio 5", "Renault Clio 5 BVA",
    "Hyundai i10", "Hyundai i20",
    "Peugeot 208",   # both cards (auto 300 and manual 250)
    "Opel Corsa", "Opel Corsa BVA",
    "Hyundai Accent", "Fiat 500 Cabriolet"
)

# ============================================================================
# STEP 2: Build new car grid — keep, update prices, add new cards
# ============================================================================
Write-Host "`n=== Building new car grid ==="

# New cars to add (not currently on site)
$newCards = @()
$newCards += New-CarCard "Hyundai Creta"     "Hyundai"    "Creta"   350 "SUV"     "#0e9f6e" "Auto." "Diesel"
$newCards += New-CarCard "Peugeot 2008"      "Peugeot"    "2008"    400 "SUV"     "#0e9f6e" "Auto." "Diesel"
$newCards += New-CarCard "Peugeot 508"       "Peugeot"    "508"     400 "Berline" "#1a56db" "Auto." "Diesel"
$newCards += New-CarCard "Renault Arkana"    "Renault"    "Arkana"  350 "SUV"     "#0e9f6e" "Auto." "Diesel"
$newCards += New-CarCard "Volkswagen Tiguan" "Volkswagen" "Tiguan"  450 "SUV"     "#0e9f6e" "Auto." "Diesel"
$newCards += New-CarCard "Dacia Sandero"     "Dacia"      "Sandero" 250 "Berline" "#1a56db" "Manu." "Diesel"
$newCards += New-CarCard "Dacia Sandero BVA" "Dacia"      "Sandero" 300 "Berline" "#1a56db" "Auto." "Diesel"
$newCards += New-CarCard "Hyundai i20"       "Hyundai"    "i20"     300 "Berline" "#1a56db" "Auto." "Essence"
$newCards += New-CarCard "Opel Corsa"        "Opel"       "Corsa"   250 "Berline" "#1a56db" "Manu." "Essence"
$newCards += New-CarCard "Opel Corsa BVA"    "Opel"       "Corsa"   300 "Berline" "#1a56db" "Auto." "Essence"
# Peugeot 208 manual (250) — extra variant (auto version already on site)
$newCards += New-CarCard "Peugeot 208"       "Peugeot"    "208"     250 "Berline" "#1a56db" "Manu." "Essence"
# Dacia Duster manual (300)
$newCards += New-CarCard "Dacia Duster"      "Dacia"      "Duster"  300 "SUV"     "#0e9f6e" "Manu." "Diesel"

$newCardNames = @("Hyundai Creta","Peugeot 2008","Peugeot 508","Renault Arkana","Volkswagen Tiguan",
                  "Dacia Sandero","Dacia Sandero BVA","Hyundai i20","Opel Corsa","Opel Corsa BVA","Dacia Duster")
# Note: "Peugeot 208" manual and "Dacia Duster" manual are new cards for existing names

# Process each existing card: keep if in list, update price, skip if not in list
$keptBlocks = [System.Collections.Generic.List[string]]::new()
$peugeot208Count = 0  # track to know which variant (auto=first, manual=new at end)

foreach ($card in $cards) {
    $name = $card.Name
    if ($keepNames -notcontains $name) {
        Write-Host "  REMOVE: $name"
        continue
    }

    # Update price if needed
    $block = $card.Block
    $targetPrice = $priceLookup[$name]

    if ($name -eq "Peugeot 208") {
        $peugeot208Count++
        # The first Peugeot 208 on site is the Auto (300 DH) — keep it
        # Price 300 is already correct, but let's ensure
        $targetPrice = 300
    }

    # Find current data-price in block
    $dpMatch = [regex]::Match($block, 'data-price="(\d+)"')
    if ($dpMatch.Success) {
        $currentPrice = [int]$dpMatch.Groups[1].Value
        if ($currentPrice -ne $targetPrice) {
            $block = Update-BlockPrice -Block $block -Name $name -OldPrice $currentPrice -NewPrice $targetPrice
            Write-Host "  KEEP+UPDATE: $name ($currentPrice -> $targetPrice)"
        } else {
            Write-Host "  KEEP: $name ($currentPrice MAD)"
        }
    }

    $keptBlocks.Add($block)
}

Write-Host "  Kept $($keptBlocks.Count) existing cards, adding $($newCards.Count) new cards"

# ============================================================================
# STEP 3: Replace the car grid section in cars.html
# ============================================================================
$gridOpen  = '<div class="cars-grid" id="cars-grid">'
$noResults = '    <div class="no-results" id="no-results">'

$gridStart = $carsText.IndexOf($gridOpen)
$noResStart = $carsText.IndexOf($noResults)

if ($gridStart -lt 0 -or $noResStart -lt 0) {
    Write-Host "ERROR: Could not find grid markers"
    exit 1
}

# Everything from after $gridOpen up to (not including) $noResults is replaced
$afterGridOpen = $gridStart + $gridOpen.Length
$beforeNoRes   = $noResStart

# Build the new grid interior
$newGridContent = "`r`n`r`n"
foreach ($b in $keptBlocks) { $newGridContent += $b + "`r`n" }
foreach ($b in $newCards)    { $newGridContent += $b + "`r`n" }
$newGridContent += "  "   # indent for no-results div

$newCarsText = $carsText.Substring(0, $afterGridOpen) +
               $newGridContent +
               $carsText.Substring($beforeNoRes)

Write-Host "  New cars.html length: $($newCarsText.Length) chars"

# ============================================================================
# STEP 4: Update calculator options (both pages)
# ============================================================================
Write-Host "`n=== Updating calculator options ==="

$emDash = [char]0x2014

# Price corrections for existing options
$optionUpdates = @(
    @{ Name="Dacia Logan";        Old=190; New=250 },
    @{ Name="Dacia Logan BVA";    Old=250; New=300 },
    @{ Name="Hyundai Tucson";     Old=490; New=350 },
    @{ Name="Kia Sportage";       Old=400; New=350 },
    @{ Name="Renault Clio 5";     Old=290; New=250 },
    @{ Name="Renault Clio 5 BVA"; Old=290; New=300 },
    @{ Name="Hyundai i10";        Old=390; New=300 },
    @{ Name="Hyundai Accent";     Old=290; New=250 },
    @{ Name="Fiat 500 Cabriolet"; Old=350; New=300 },
    @{ Name="Volkswagen T-Roc";   Old=500; New=400 },
    @{ Name="Volkswagen Golf 8";  Old=650; New=450 }
)

# Cars to REMOVE from calculator
$removeFromCalc = @(
    "Dacia Jogger","Dacia Stepway","Renault Express",
    "Audi A3","Audi A6","Audi Q8","BMW X5",
    "Mercedes Classe A","Mercedes Classe CLA","Mercedes Classe G","Mercedes Classe S","Mercedes Classe V",
    "Peugeot 3008 BVA","Peugeot 301","Porsche Macan",
    "Range Rover Evoque","Range Rover Sport","Range Rover Vogue",
    "Renault Captur","Renault Megane BVA","Volkswagen Passat BVA","Volkswagen Touareg"
)

function Update-Calc {
    param([string]$Text)

    # Update prices
    foreach ($u in $optionUpdates) {
        $n = $u.Name; $o = $u.Old; $nw = $u.New
        $oldFmt = if($o  -ge 1000){$o.ToString("N0") }else{$o.ToString()}
        $newFmt = if($nw -ge 1000){$nw.ToString("N0")}else{$nw.ToString()}
        $old = "value=""$o"" data-name=""$n"">$n $emDash $oldFmt MAD/jour"
        $new = "value=""$nw"" data-name=""$n"">$n $emDash $newFmt MAD/jour"
        $Text = $Text.Replace($old, $new)
    }

    # Remove unlisted cars
    foreach ($name in $removeFromCalc) {
        $en = [regex]::Escape($name)
        $Text = [regex]::Replace($Text, "(?m)^\s*<option[^>]*data-name=""$en"">[^\r\n]+\r?\n", "")
    }

    # Build new options to append (new cars not yet in the dropdown)
    $newOpts = @"

              <option value="350" data-name="Hyundai Creta">Hyundai Creta $emDash 350 MAD/jour</option>
              <option value="400" data-name="Peugeot 2008">Peugeot 2008 $emDash 400 MAD/jour</option>
              <option value="400" data-name="Peugeot 508">Peugeot 508 $emDash 400 MAD/jour</option>
              <option value="350" data-name="Renault Arkana">Renault Arkana $emDash 350 MAD/jour</option>
              <option value="450" data-name="Volkswagen Tiguan">Volkswagen Tiguan $emDash 450 MAD/jour</option>
              <option value="250" data-name="Dacia Sandero">Dacia Sandero $emDash 250 MAD/jour</option>
              <option value="300" data-name="Dacia Sandero BVA">Dacia Sandero BVA $emDash 300 MAD/jour</option>
              <option value="300" data-name="Hyundai i20">Hyundai i20 $emDash 300 MAD/jour</option>
              <option value="250" data-name="Opel Corsa">Opel Corsa $emDash 250 MAD/jour</option>
              <option value="300" data-name="Opel Corsa BVA">Opel Corsa BVA $emDash 300 MAD/jour</option>
              <option value="250" data-name="Peugeot 208 Manuel">Peugeot 208 Manuel $emDash 250 MAD/jour</option>
              <option value="300" data-name="Dacia Duster">Dacia Duster $emDash 300 MAD/jour</option>
"@

    # Insert new options before </select>
    # Find the closing </select> that belongs to the car calculator
    $insertBefore = "            </select>"
    $Text = $Text.Replace($insertBefore, $newOpts + "`r`n" + $insertBefore, 1)

    return $Text
}

$newCarsText  = Update-Calc -Text $newCarsText
$newIndexText = Update-Calc -Text $indexText
Write-Host "  Calculator options updated in both files"

# ============================================================================
# STEP 5: Update filter counts and hero stat in cars.html
# Kept: Berline=16, SUV=9, Total=25
# (Dacia Logan, Dacia Logan BVA, Peugeot 208 auto, Peugeot 208 manual,
#  Renault Clio 5, Renault Clio 5 BVA, Fiat 500 Cabriolet, Hyundai Accent,
#  Hyundai i10, Hyundai i20, Opel Corsa, Opel Corsa BVA, Peugeot 508,
#  Dacia Sandero, Dacia Sandero BVA, Volkswagen Golf 8 = 16 Berlines)
# (Hyundai Tucson, Hyundai Creta, VW T-Roc, Kia Sportage, Peugeot 2008,
#  Renault Arkana, VW Tiguan, Dacia Duster 4x4, Dacia Duster = 9 SUVs)
# ============================================================================
Write-Host "`n=== Updating filter counts ==="

$newCarsText = $newCarsText -replace 'Tous \(\d+\)',      'Tous (25)'
$newCarsText = $newCarsText -replace 'Berline \(\d+\)',   'Berline (16)'
$newCarsText = $newCarsText -replace 'SUV \(\d+\)',       'SUV (9)'
$newCarsText = $newCarsText -replace 'Luxe \(\d+\)',      'Luxe (0)'
$newCarsText = $newCarsText -replace 'Familiale \(\d+\)', 'Familiale (0)'
$newCarsText = $newCarsText -replace 'Utilitaire \(\d+\)','Utilitaire (0)'
$newCarsText = $newCarsText -replace '35 v[eé]hicules disponibles', '25 v&#xE9;hicules disponibles'
$newCarsText = $newCarsText -replace '<span class="num">35</span>', '<span class="num">25</span>'
Write-Host "  Tous=25, Berline=16, SUV=9"

# ============================================================================
# SAVE
# ============================================================================
Write-Host "`n=== Saving ==="
[System.IO.File]::WriteAllText($carsFile,  $newCarsText,  [System.Text.Encoding]::UTF8)
[System.IO.File]::WriteAllText($indexFile, $newIndexText, [System.Text.Encoding]::UTF8)
Write-Host "  cars.html saved  ($($newCarsText.Length) chars)"
Write-Host "  index.html saved ($($newIndexText.Length) chars)"

# ============================================================================
# VERIFY
# ============================================================================
Write-Host "`n=== Final verification ==="
$verify = [System.IO.File]::ReadAllText($carsFile, [System.Text.Encoding]::UTF8)
$lines = $verify -split "`n"
$found = @()
for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match '<h3>([^<]+)</h3>') {
        $found += $matches[1]
    }
}
Write-Host "  Total car cards: $($found.Count)"
$found | ForEach-Object { Write-Host "    $_" }
Write-Host "`n=== DONE ==="
