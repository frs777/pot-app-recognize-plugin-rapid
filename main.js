async function recognize(_base64, lang, options) {
    const { utils } = options;
    const { run, cacheDir, osType, pluginDir } = utils;
    let exeName = osType === "Windows_NT" ? "RapidOcrOnnx.exe" : "RapidOcrOnnx";
    let result = await run(`${pluginDir}/${exeName}`, [
        "--models",
        "models",
        "--det",
        "ch_PP-OCR_det_infer.onnx",
        "--cls",
        "ch_ppocr_mobile_v2.0_cls_infer.onnx",
        "--rec",
        `${lang}_PP-OCR_rec_infer.onnx`,
        "--keys",
        `${lang}_dict.txt`,
        "--image",
        `${cacheDir}/pot_screenshot_cut.png`,
        "--numThread",
        "64",
        "--padding",
        "50",
        "--maxSideLen",
        "1024",
        "--boxScoreThresh",
        "0.5",
        "--boxThresh",
        "0.5",
        "--unClipRatio",
        "1.6",
        "--doAngle",
        "1",
        "--mostAngle",
        "1",
    ]);
    if (result.status === 0) {
        let out = result.stdout;
        out = out.split("=====End detect=====");
        out = out[1];
        return out.split("s)")[1].trim();
    } else {
        throw Error(result.stderr);
    }
}