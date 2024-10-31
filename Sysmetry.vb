Imports System
Imports System.Drawing
Imports System.Windows.Forms

Public Class SupersymmetryVisualizer
    Inherits Form

    Private Const BosonDimensions As Integer = 26
    Private Const FermionDimensions As Integer = 10  ' Superstring theory typically uses 10 dimensions
    Private Const VisualizableDimensions As Integer = 3
    Private ReadOnly random As New Random()

    Private Class Particle
        Public Position(Math.Max(BosonDimensions, FermionDimensions) - 1) As Double
        Public Velocity(Math.Max(BosonDimensions, FermionDimensions) - 1) As Double
        Public Energy As Double
        Public Spin As Double  ' Simplified representation of spin
        Public IsBoson As Boolean
    End Class

    Private particles As New List(Of Particle)

    Public Sub New()
        Me.Text = "Supersymmetry Visualizer: Bosons and Fermions"
        Me.Size = New Size(800, 600)
        Me.DoubleBuffered = True

        For i As Integer = 1 To 50
            particles.Add(CreateRandomBoson())
            particles.Add(CreateRandomFermion())
        Next

        Dim timer As New Timer()
        timer.Interval = 50
        AddHandler timer.Tick, AddressOf UpdateAndRedraw
        timer.Start()
    End Sub

    Private Function CreateRandomBoson() As Particle
        Dim p As New Particle()
        p.IsBoson = True
        For d As Integer = 0 To BosonDimensions - 1
            p.Position(d) = random.NextDouble() * 2 - 1
            p.Velocity(d) = (random.NextDouble() * 2 - 1) * 0.01
        Next
        p.Energy = random.NextDouble()
        p.Spin = Math.Floor(random.NextDouble() * 3)  ' Simplified: bosons have integer spin (0, 1, or 2)
        Return p
    End Function

    Private Function CreateRandomFermion() As Particle
        Dim p As New Particle()
        p.IsBoson = False
        For d As Integer = 0 To FermionDimensions - 1
            p.Position(d) = random.NextDouble() * 2 - 1
            p.Velocity(d) = (random.NextDouble() * 2 - 1) * 0.01
        Next
        p.Energy = random.NextDouble()
        p.Spin = Math.Floor(random.NextDouble() * 2) + 0.5  ' Simplified: fermions have half-integer spin (0.5 or 1.5)
        Return p
    End Function

    Private Sub UpdateAndRedraw(sender As Object, e As EventArgs)
        For Each p In particles
            Dim dimensions As Integer = If(p.IsBoson, BosonDimensions, FermionDimensions)
            For d As Integer = 0 To dimensions - 1
                p.Position(d) += p.Velocity(d)
                If Math.Abs(p.Position(d)) > 1 Then
                    p.Position(d) = -Math.Sign(p.Position(d))
                End If
            Next
            ' Simulate energy fluctuation
            p.Energy += (random.NextDouble() * 2 - 1) * 0.01
            p.Energy = Math.Max(0, Math.Min(1, p.Energy))

            ' Simulate supersymmetric partner interaction (very simplified)
            If random.NextDouble() < 0.01 Then  ' Small chance of interaction
                p.IsBoson = Not p.IsBoson  ' Flip between boson and fermion
                p.Spin = If(p.IsBoson, Math.Floor(p.Spin), p.Spin + 0.5)  ' Adjust spin
            End If
        Next
        Me.Invalidate()
    End Sub

    Protected Overrides Sub OnPaint(e As PaintEventArgs)
        MyBase.OnPaint(e)
        Dim g As Graphics = e.Graphics
        g.Clear(Color.Black)

        For Each p In particles
            ' Project the first 3 dimensions onto the 2D screen
            Dim x As Single = CType((p.Position(0) + 1) * Me.Width / 2, Single)
            Dim y As Single = CType((p.Position(1) + 1) * Me.Height / 2, Single)
            Dim size As Single = CType((p.Position(2) + 1) * 10 + 1, Single)

            ' Use energy to determine color intensity
            Dim intensity As Integer = CType(p.Energy * 255, Integer)
            Dim color As Color
            If p.IsBoson Then
                color = Color.FromArgb(intensity, 0, intensity)  ' Purple for bosons
            Else
                color = Color.FromArgb(0, intensity, intensity)  ' Cyan for fermions
            End If

            ' Use spin to determine shape
            If Math.Floor(p.Spin) Mod 2 = 0 Then  ' Integer spin (including 0) for bosons
                g.FillEllipse(New SolidBrush(color), x - size / 2, y - size / 2, size, size)
            Else  ' Half-integer spin for fermions
                g.FillRectangle(New SolidBrush(color), x - size / 2, y - size / 2, size, size)
            End If
        Next

        ' Display information
        g.DrawString("Supersymmetry Visualization: Bosons and Fermions", New Font("Arial", 12), Brushes.White, 10, 10)
        g.DrawString("Purple circles: Bosons (26D)", New Font("Arial", 10), Brushes.Purple, 10, 30)
        g.DrawString("Cyan squares: Fermions (10D)", New Font("Arial", 10), Brushes.Cyan, 10, 50)
        g.DrawString("Size: Position in 3rd dimension", New Font("Arial", 10), Brushes.White, 10, 70)
        g.DrawString("Color intensity: Energy", New Font("Arial", 10), Brushes.White, 10, 90)
        g.DrawString("Shape changing: Supersymmetric partner interaction", New Font("Arial", 10), Brushes.White, 10, 110)
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
        Application.Run(New SupersymmetryVisualizer())
    End Sub
End Class