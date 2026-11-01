$ErrorActionPreference = 'Stop'
$taskOutput = $PSScriptRoot
$wordApp = New-Object -ComObject Word.Application
$wordApp.Visible = $false
$wordApp.DisplayAlerts = 0
try {
    foreach ($taskName in @('Articulo_corregido_Bardales_Rodriguez', 'Respuesta_revision_y_revistas')) {
        $taskInput = Join-Path $taskOutput ($taskName + '.docx')
        $taskPdf = Join-Path $taskOutput ($taskName + '.pdf')
        $taskDoc = $wordApp.Documents.Open($taskInput, $false, $true)
        try {
            $taskDoc.Repaginate()
            $taskDoc.ExportAsFixedFormat($taskPdf, 17)
            Write-Output ($taskName + ': ' + $taskDoc.ComputeStatistics(2) + ' paginas')
        } finally { $taskDoc.Close(0) }
    }
} finally {
    $wordApp.Quit()
    [System.Runtime.InteropServices.Marshal]::ReleaseComObject($wordApp) | Out-Null
}
