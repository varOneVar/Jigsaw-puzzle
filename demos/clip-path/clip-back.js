function clipPath(element) {
  const e = element
  if (!e) return false
  e.removeAttribute('id')
  const options = {
    height: e.clientHeight,
    width: e.clientWidth,
    distance: 60,
    html: e.outerHTML
  }
  if (window.getComputedStyle(document.body).webkitClipPath) {
    const { distance, height, width } = options
    let result = ''
    for (let i = 0; i < width; i += distance) {
      for (let j = 0; j < height; j += distance) {
        const di = i + distance
        const dj = j + distance
        const a = [i, j]
        const b = [i, dj]
        const c = [di, dj]
        const d = [di, j]
        const g = [i + distance / 2, j + distance / 2]
        const mx = [
          [a, g, d],
          [a, b, g],
          [g, b, c],
          [d, g, c]
        ]
        const res = mx.reduce((t, v) => {
          const r = v.map((vz) => vz.map((zz) => `${zz}px`).join(' ')).join()
          const polygon = `-webkit-clip-path: polygon(${r});`
          const ra = Math.random()
          const dx = ra < 0.5 ? -1 : 1
          const up = [600 * (0.5 - Math.random()), 600 * (0.5 - Math.random())]
          const translate = `translate(${up.map((vi) => `${vi}px`).join()}) rotate(${Math.round(
            dx * 360 * Math.random()
          )}deg)`
          const ttt = `-webkit-transform:${translate};transform:${translate};`
          t += options.html.replace('">', `" style="${polygon}${ttt}">`)
          return t
        }, '')
        result += res
      }
    }
    e.parentNode.innerHTML = options.html + result
    return true
  }
  e.className += ' no-clipath'
  return false
}
