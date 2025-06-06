// 文件: workers-site/index.js
// 标准的Cloudflare Pages Worker脚本

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event))
})

/**
 * 处理请求
 * @param {Event} event
 */
async function handleRequest(event) {
  const url = new URL(event.request.url)

  try {
    // 尝试从静态资产获取
    const response = await fetch(event.request)

    // 如果资源存在，返回它
    if (response.status < 400) {
      return response
    }

    // 如果资源不存在，返回index.html (SPA处理)
    return await fetch(`${url.origin}/index.html`, event.request)
  } catch (e) {
    // 返回错误信息
    return new Response('Error serving content: ' + (e.message || e.toString()), {
      status: 500,
    })
  }
}
