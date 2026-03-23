import math

def make_gear(cx, cy, r_inner, r_outer, teeth, hole):
    pts = []
    angle_step = 2 * math.pi / teeth
    for i in range(teeth):
        a1 = i * angle_step
        a2 = a1 + angle_step * 0.2
        a3 = a1 + angle_step * 0.4
        a4 = a1 + angle_step * 0.6
        a5 = a1 + angle_step * 0.8
        
        # tooth start (inner)
        pts.append((cx + r_inner * math.cos(a1), cy + r_inner * math.sin(a1)))
        # tooth out
        pts.append((cx + r_outer * math.cos(a2), cy + r_outer * math.sin(a2)))
        # tooth out next
        pts.append((cx + r_outer * math.cos(a4), cy + r_outer * math.sin(a4)))
        # tooth end (inner)
        pts.append((cx + r_inner * math.cos(a5), cy + r_inner * math.sin(a5)))
        
    path = "M " + " L ".join(f"{x:.2f},{y:.2f}" for x,y in pts) + " Z"
    return path + f" M{cx-hole},{cy} a{hole},{hole} 0 1,0 {hole*2},0 a{hole},{hole} 0 1,0 -{hole*2},0"

gear1 = make_gear(35, 30, 20, 26, 8, 8)
gear2 = make_gear(65, 65, 14, 18, 6, 5)

svg = f"""<svg width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="{gear1}" stroke="currentColor" stroke-width="3" fill="none" stroke-linejoin="miter" stroke-linecap="square"/>
    <path d="{gear2}" stroke="currentColor" stroke-width="3" fill="none" stroke-linejoin="miter" stroke-linecap="square"/>
</svg>"""

with open('images/services-bg-icon.svg', 'w') as f:
    f.write(svg)
