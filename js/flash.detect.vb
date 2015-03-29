on error resume next

If MSDetect = "true" Then
	For i = 2 to 6
		If Not(IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash." & i))) Then

		Else
			flashinstalled = 2
			flashversion = i
		End If
	Next
End If

If flashinstalled = 0 Then
	flashinstalled = 1
End If