<#
  update-gallery.ps1
  Scanne le dossier images/ et remplace la section <section class="container gallery"> dans index.html
  par des <figure> générés pour chaque image trouvée (png, jpg, jpeg, webp).
  Usage: powershell -ExecutionPolicy Bypass -File .\update-gallery.ps1
#>

$project = Get-Location
$imgDir = Join-Path $project 'images'
$indexFile = Join-Path $project 'index.html'

if (-not (Test-Path $imgDir)) {
    Write-Host "Aucun dossier images/ trouvé." -ForegroundColor Yellow
    exit 1
}

$images = Get-ChildItem -Path $imgDir -File | Where-Object { $_.Extension -in '.jpg','.jpeg','.png','.webp' } | Sort-Object Name

if ($images.Count -eq 0) {
    Write-Host "Aucune image locale détectée dans images/. Le fichier index.html restera inchangé." -ForegroundColor Yellow
    exit 0
}

$figures = foreach ($img in $images) {
        $src = "images/$($img.Name)"
        $alt = ($img.BaseName -replace '[-_]', ' ') -replace '\d+$',''
        $caption = ($alt -replace '\b(img|photo|image)\b','') -replace '\s+',' '
        @"
                <figure>
                    <img src="$src" alt="$alt" data-filename="$($img.Name)">
                    <figcaption>$caption</figcaption>
                </figure>
"@
}

$newGallery = @"
    <section class="container gallery">
      <h3>Galerie photos</h3>
      <p class="muted">Quelques vues de nos locaux et équipes.</p>
      <div class="gallery-grid">
$($figures -join "`n")
      </div>
    </section>
"@

if (-not (Test-Path $indexFile)) {
    Write-Host "index.html introuvable." -ForegroundColor Red
    exit 1
}

$content = Get-Content -Raw -Path $indexFile

$startTag = '<section class="container gallery">'
$startIdx = $content.IndexOf($startTag)
if ($startIdx -lt 0) {
    Write-Host "Section de galerie non trouvée dans index.html; ajout de la nouvelle section avant le footer." -ForegroundColor Cyan
    $footerTag = '<footer class="site-footer">'
    $footerIdx = $content.IndexOf($footerTag)
    if ($footerIdx -ge 0) {
        $content = $content.Substring(0,$footerIdx) + "`n" + $newGallery + "`n" + $content.Substring($footerIdx)
    } else {
        $content += "`n" + $newGallery
    }
} else {
    # find the next </section> after startIdx
    $after = $content.Substring($startIdx)
    $endIdxRel = $after.IndexOf('</section>')
    if ($endIdxRel -lt 0) {
        Write-Host "Balise de fin </section> introuvable après le début de la galerie." -ForegroundColor Red
        exit 1
    }
    $endIdx = $startIdx + $endIdxRel + 10 # length of </section>
    $content = $content.Substring(0,$startIdx) + $newGallery + $content.Substring($endIdx)
}

Set-Content -Path $indexFile -Value $content -Encoding UTF8
Write-Host "index.html mis à jour avec $($images.Count) image(s) locales." -ForegroundColor Green
