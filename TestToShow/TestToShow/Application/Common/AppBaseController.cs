using Microsoft.AspNetCore.Mvc;

namespace TestToShow.Application.Common;

[ApiController]
[Produces("application/json", new string[] { })]
[Route("api/v1/[controller]")]
public class AppBaseController : ControllerBase;