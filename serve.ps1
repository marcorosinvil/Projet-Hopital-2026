# Simple PowerShell static file server
$prefix = "http://localhost:8000/"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
try {
    $listener.Start()
    Write-Host 'Serving ' $prefix ' - Ctrl+C to stop'
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $req = $context.Request
        $path = $req.Url.AbsolutePath.TrimStart('/')
        if ([string]::IsNullOrEmpty($path)) { $path = 'index.html' }
        $file = Join-Path -Path (Get-Location) -ChildPath $path
        if (Test-Path $file) {
            $bytes = [System.IO.File]::ReadAllBytes($file)
            $ext = [System.IO.Path]::GetExtension($file).ToLower()
            switch ($ext) {
                '.html' { $mime='text/html; charset=utf-8' }
                '.css'  { $mime='text/css' }
                '.js'   { $mime='application/javascript' }
                '.png'  { $mime='image/png' }
                '.jpg' { $mime='image/jpeg' }
                '.jpeg' { $mime='image/jpeg' }
                '.svg' { $mime='image/svg+xml' }
                default { $mime='application/octet-stream' }
            }
            $context.Response.ContentType = $mime
            $context.Response.ContentLength64 = $bytes.Length
            $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
            $context.Response.OutputStream.Close()
        } else {
            $context.Response.StatusCode = 404
            $msg = '404 Not Found'
            $buf = [System.Text.Encoding]::UTF8.GetBytes($msg)
            $context.Response.OutputStream.Write($buf,0,$buf.Length)
            $context.Response.Close()
        }
    }
} finally {
    if ($listener -and $listener.IsListening) { $listener.Stop() }
}
