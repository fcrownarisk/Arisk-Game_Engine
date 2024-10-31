Imports System
Imports System.Drawing
Imports System.Windows.Forms

Public Class StringTheoryVisualizer
    Inherits Form

    Private Const Dimensions As Integer = 26
    Private Const VisualizableDimensions As Integer = 3
    Private ReadOnly random As New Random()

    Private Class StringParticle
        Public Position(Dimensions - 1) As Double
        Public Velocity(Dimensions - 1) As Double
        Public Energy As Double
    End Class

    Private strings As New List(Of StringParticle)

    Public Sub New()
        Me.Text = "26 Dimensional Boson String Theory Visualizer"
        Me.Size = New Size(800, 600)
        Me.DoubleBuffered = True

        For i As Integer = 1 To 100
            strings.Add(CreateRandomString())
        Next

        Dim timer As New Timer()
        timer.Interval = 50
        AddHandler timer.Tick, AddressOf UpdateAndRedraw
        timer.Start()
    End Sub

    Private Function CreateRandomString() As StringParticle
        Dim s As New StringParticle()
        For d As Integer = 0 To Dimensions - 1
            s.Position(d) = random.NextDouble() * 2 - 1
            s.Velocity(d) = (random.NextDouble() * 2 - 1) * 0.01
        Next
        s.Energy = random.NextDouble()
        Return s
    End Function

    Private Sub UpdateAndRedraw(sender As Object, e As EventArgs)
        For Each s In strings
            ' Update position based on velocity in all dimensions
            For d As Integer = 0 To Dimensions - 1
                s.Position(d) += s.Velocity(d)
                ' Wrap around if out of bounds
                If Math.Abs(s.Position(d)) > 1 Then
                    s.Position(d) = -Math.Sign(s.Position(d))
                End If
            Next
            ' Simulate some energy fluctuation
            s.Energy += (random.NextDouble() * 2 - 1) * 0.01
            s.Energy = Math.Max(0, Math.Min(1, s.Energy))
        Next
        Me.Invalidate()
    End Sub

    Protected Overrides Sub OnPaint(e As PaintEventArgs)
        MyBase.OnPaint(e)
        Dim g As Graphics = e.Graphics
        g.Clear(Color.Black)

        For Each s In strings
            ' Project the first 3 dimensions onto the 2D screen
            Dim x As Single = CType((s.Position(0) + 1) * Me.Width / 2, Single)
            Dim y As Single = CType((s.Position(1) + 1) * Me.Height / 2, Single)
            Dim size As Single = CType((s.Position(2) + 1) * 10 + 1, Single)

            ' Use energy to determine color
            Dim hue As Single = CType(s.Energy * 360, Single)
            Dim color As Color = ColorFromHSV(hue, 1, 1)

            g.FillEllipse(New SolidBrush(color), x - size / 2, y - size / 2, size, size)
        Next

        ' Display some information
        g.DrawString("26D Boson String Theory Visualization", New Font("Arial", 12), Brushes.White, 10, 10)
        g.DrawString("Displaying first 3 dimensions", New Font("Arial", 10), Brushes.White, 10, 30)
        g.DrawString("Color represents energy in higher dimensions", New Font("Arial", 10), Brushes.White, 10, 50)
        g.DrawString("Size represents position in 3rd dimension", New Font("Arial", 10), Brushes.White, 10, 70)
    End Sub

    Private Function ColorFromHSV(hue As Single, saturation As Single, value As Single) As Color
        Dim hi As Integer = CInt(Math.Floor(hue / 60)) Mod 6
        Dim f As Single = hue / 60 - Math.Floor(hue / 60)

        value = value * 255
        Dim v As Integer = CInt(value)
        Dim p As Integer = CInt(value * (1 - saturation))
        Dim q As Integer = CInt(value * (1 - f * saturation))
        Dim t As Integer = CInt(value * (1 - (1 - f) * saturation))

        Select Case hi
            Case 0 : Return Color.FromArgb(255, v, t, p)
            Case 1 : Return Color.FromArgb(255, q, v, p)
            Case 2 : Return Color.FromArgb(255, p, v, t)
            Case 3 : Return Color.FromArgb(255, p, q, v)
            Case 4 : Return Color.FromArgb(255, t, p, v)
            Case Else : Return Color.FromArgb(255, v, p, q)
        End Select
    End Function

    Public Shared Sub Main()
        Application.Run(New StringTheoryVisualizer())
    End Sub
End Class