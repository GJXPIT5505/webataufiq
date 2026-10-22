"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ScallopBadge } from "@/Components/about/VisiMisiSection";
import ImagePlaceholder from "@/Components/ui/ImagePlaceholder";
import SectionBox from "../SectionBox";
import Reveal from "@/Components/home/Reveal";

// Tab icons — contour-traced from the icon sprite sheet the user
// supplied (same cv2.findContours pipeline used for the FAQ tab icons
// and the pillar icons), not hand-drawn. The sheet's background is a
// radial-glow gradient rather than flat, so a plain global threshold
// picked up the glow as a big blob — a large-block adaptive threshold
// (comparing each pixel to its own local neighborhood instead of a
// single global or lightly-local value) is what isolated the actual
// stroke lines cleanly.
function ClassroomIcon() {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" fillRule="evenodd" className="h-full w-full" aria-hidden="true">
      <path d="M408,337 L402,340 L398,344 L395,349 L395,351 L393,355 L393,363 L394,364 L395,369 L399,376 L404,381 L404,382 L423,400 L427,402 L433,401 L439,397 L460,376 L464,369 L465,361 L466,360 L466,358 L465,357 L465,352 L462,346 L457,341 L449,337 L438,337 L434,339 L429,344 L426,341 L419,337 Z M402,357 L403,356 L403,354 L404,353 L404,352 L409,347 L410,347 L411,346 L417,346 L418,347 L419,347 L423,351 L423,352 L425,354 L425,355 L428,357 L430,357 L431,356 L432,356 L432,355 L434,353 L434,352 L439,347 L441,347 L442,346 L447,346 L448,347 L451,348 L454,351 L454,352 L455,353 L455,355 L456,356 L456,363 L455,364 L453,369 L435,387 L434,387 L430,391 L427,391 L408,372 L408,371 L405,368 L405,367 L403,364 Z M317,270 L314,272 L310,281 L309,287 L306,291 L289,291 L286,292 L283,295 L282,300 L284,304 L297,316 L297,320 L294,330 L294,336 L298,341 L303,342 L310,339 L319,333 L322,333 L335,341 L338,342 L343,341 L347,336 L347,327 L345,321 L345,316 L358,305 L360,302 L360,296 L357,292 L354,291 L337,291 L334,288 L328,273 L325,270 Z M350,300 L350,301 L343,307 L342,307 L337,312 L336,314 L336,319 L337,320 L338,328 L339,329 L339,331 L338,332 L334,331 L328,326 L324,325 L323,324 L319,324 L305,333 L303,331 L303,329 L304,328 L304,324 L306,320 L306,313 L302,308 L301,308 L294,302 L294,300 L295,299 L309,299 L313,297 L315,295 L316,291 L317,290 L317,288 L319,285 L319,283 L321,281 L323,282 L324,286 L326,289 L326,291 L329,297 L333,299 L349,299 Z M236,293 L235,302 L299,383 L308,390 L318,391 L326,387 L366,355 L367,415 L376,426 L479,427 L490,417 L491,320 L488,312 L476,305 L404,306 L340,223 L330,221 L319,225 Z M381,315 L476,315 L480,318 L482,323 L482,408 L480,414 L477,417 L383,418 L377,413 L376,321 Z M333,231 L347,246 L391,303 L391,305 L378,306 L370,312 L367,319 L367,341 L321,379 L314,382 L305,375 L245,299 L248,294 L323,234 L329,231 Z" />
    </svg>
  );
}

function PlaygroundIcon() {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" fillRule="evenodd" className="h-full w-full" aria-hidden="true">
      <path d="M210,309 L209,310 L207,310 L205,312 L202,313 L198,317 L198,318 L196,320 L196,321 L194,324 L194,326 L193,327 L193,340 L194,341 L194,343 L197,347 L197,348 L203,354 L204,354 L206,356 L208,356 L209,357 L211,357 L212,358 L224,358 L225,357 L227,357 L228,356 L233,354 L239,348 L239,347 L242,342 L242,340 L243,339 L243,327 L242,326 L242,324 L241,323 L240,320 L237,317 L237,316 L236,315 L235,315 L232,312 L231,312 L228,310 L226,310 L225,309 L222,309 L221,308 L216,308 L215,309 Z M216,317 L220,317 L221,318 L224,318 L225,319 L226,319 L228,321 L229,321 L231,323 L231,324 L233,326 L233,327 L234,328 L234,337 L233,338 L233,339 L232,340 L232,341 L231,342 L231,343 L227,347 L226,347 L225,348 L224,348 L223,349 L220,349 L219,350 L216,350 L215,349 L213,349 L212,348 L211,348 L210,347 L209,347 L208,346 L207,346 L206,345 L206,344 L204,342 L204,341 L203,340 L203,339 L202,338 L202,328 L203,327 L203,326 L205,324 L205,323 L208,320 L209,320 L210,319 L211,319 L212,318 L215,318 Z M214,178 L210,226 L155,289 L157,295 L168,298 L167,363 L151,373 L118,456 L128,455 L136,437 L169,436 L165,455 L172,458 L200,385 L259,387 L258,455 L265,458 L270,371 L288,377 L324,428 L347,447 L378,456 L404,452 L411,442 L409,427 L366,406 L319,342 L299,331 L268,329 L267,297 L276,295 L278,289 L220,224 L259,206 L262,196 Z M139,427 L139,425 L140,424 L140,423 L141,422 L141,421 L142,420 L142,418 L143,417 L143,416 L144,415 L144,414 L146,412 L178,412 L179,413 L179,414 L178,415 L178,417 L177,418 L177,419 L176,420 L176,422 L175,423 L175,425 L174,426 L174,427 L172,429 L170,429 L169,428 L145,428 L144,429 L141,429 Z M163,374 L164,374 L165,373 L166,373 L168,375 L168,376 L167,377 L167,379 L168,380 L168,382 L171,385 L173,385 L174,386 L178,386 L179,385 L185,385 L187,387 L186,388 L186,390 L185,391 L185,393 L184,394 L184,396 L183,397 L183,400 L181,403 L150,403 L149,402 L149,401 L151,398 L151,396 L152,395 L152,394 L153,393 L153,392 L154,391 L154,390 L156,387 L156,385 L157,384 L157,383 L158,382 L158,381 L159,380 L159,379 L160,378 L160,377 Z M267,340 L290,339 L301,342 L308,346 L317,354 L325,364 L350,403 L369,420 L380,425 L397,428 L400,431 L402,437 L400,442 L395,446 L372,446 L361,443 L345,434 L331,421 L320,406 L303,378 L295,370 L289,366 L280,363 L269,363 L267,361 L268,360 Z M176,298 L178,296 L258,296 L259,297 L259,375 L257,377 L177,377 L176,376 L177,371 L177,304 L176,303 Z M169,286 L182,273 L182,272 L198,255 L198,254 L205,247 L205,246 L210,241 L215,234 L217,234 L220,237 L222,241 L230,249 L230,250 L253,275 L253,276 L262,285 L260,288 L259,287 L257,288 L256,287 L184,287 L183,288 L171,288 Z M220,212 L220,190 L222,188 L223,189 L224,189 L225,190 L226,190 L227,191 L229,191 L230,192 L231,192 L232,193 L234,193 L235,194 L237,194 L238,195 L239,195 L240,196 L242,196 L243,197 L245,197 L246,198 L247,198 L249,200 L248,201 L247,201 L246,202 L245,202 L244,203 L243,203 L242,204 L240,204 L239,205 L238,205 L237,206 L236,206 L235,207 L233,207 L232,208 L231,208 L230,209 L229,209 L228,210 L226,210 L224,212 L223,212 L222,213 L221,213 Z" />
    </svg>
  );
}

function PlayroomIcon() {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" fillRule="evenodd" className="h-full w-full" aria-hidden="true">
      <path d="M137,352 L133,356 L132,358 L132,363 L133,364 L133,366 L134,368 L138,371 L139,371 L142,375 L139,379 L137,379 L136,380 L134,380 L129,377 L127,377 L124,380 L124,385 L126,387 L127,387 L129,389 L136,390 L137,389 L140,389 L142,388 L146,384 L147,382 L150,382 L154,386 L156,386 L157,387 L162,387 L163,386 L165,386 L171,381 L171,379 L170,377 L166,374 L160,377 L158,377 L157,378 L155,378 L152,375 L151,373 L151,371 L154,368 L157,362 L157,359 L154,353 L150,351 L147,351 L146,350 L143,350 L142,351 L139,351 Z M107,335 L106,336 L106,337 L105,338 L105,339 L104,340 L104,346 L105,347 L105,348 L108,351 L109,351 L110,352 L115,352 L116,351 L118,351 L121,348 L121,347 L122,346 L122,339 L118,335 L117,335 L116,334 L109,334 L108,335 Z M264,333 L259,337 L256,343 L257,364 L247,365 L241,368 L235,376 L235,385 L238,391 L232,394 L226,401 L225,412 L228,419 L218,427 L216,433 L217,443 L224,451 L230,454 L314,455 L321,453 L330,444 L331,433 L328,426 L319,419 L322,410 L319,399 L308,392 L310,385 L308,372 L299,365 L288,364 L290,348 L289,342 L284,335 L276,332 Z M225,436 L226,435 L227,431 L232,427 L314,427 L318,429 L321,433 L321,439 L318,443 L314,445 L233,445 L229,443 L227,441 L226,437 Z M235,405 L236,404 L236,403 L240,400 L306,400 L311,405 L311,407 L312,408 L312,411 L311,412 L311,414 L307,418 L240,418 L235,413 Z M244,379 L245,378 L245,377 L248,374 L295,374 L296,375 L297,375 L300,378 L300,380 L301,381 L301,385 L300,386 L300,387 L296,391 L249,391 L245,387 L245,386 L244,385 Z M272,341 L274,341 L275,342 L276,342 L279,345 L279,346 L280,347 L280,363 L281,364 L280,365 L278,365 L277,366 L274,366 L273,365 L267,365 L266,364 L266,362 L265,361 L265,348 L266,347 L266,345 L269,342 L271,342 Z M170,332 L169,333 L169,334 L168,335 L168,336 L167,337 L167,340 L168,341 L168,343 L170,345 L170,346 L171,346 L173,348 L181,348 L185,344 L185,343 L186,342 L186,335 L182,331 L181,331 L180,330 L174,330 L173,331 L172,331 L171,332 Z M226,255 L210,249 L197,250 L182,258 L173,270 L159,267 L142,267 L111,276 L94,264 L74,263 L57,273 L49,290 L50,308 L55,317 L69,328 L65,343 L68,369 L78,390 L91,404 L103,412 L119,418 L138,421 L156,420 L181,412 L198,401 L209,390 L220,374 L227,352 L227,331 L222,311 L234,301 L240,284 L238,271 Z M171,279 L183,284 L197,294 L206,304 L214,319 L217,331 L217,350 L213,365 L202,383 L190,395 L169,407 L151,411 L133,411 L107,403 L96,395 L86,384 L79,370 L77,362 L76,339 L80,323 L85,313 L102,294 L124,281 L145,277 Z M100,278 L102,280 L102,282 L100,284 L99,284 L97,286 L96,286 L93,289 L92,289 L87,294 L87,295 L83,299 L83,300 L80,303 L80,304 L78,306 L78,307 L77,308 L77,309 L76,310 L75,313 L73,315 L73,316 L71,318 L70,317 L69,317 L62,310 L62,309 L60,306 L60,304 L59,303 L59,290 L60,289 L60,288 L61,287 L61,285 L63,283 L63,282 L69,276 L70,276 L75,273 L80,273 L81,272 L85,272 L86,273 L90,273 L91,274 L93,274 L94,275 L97,276 L99,278 Z M190,264 L191,264 L196,261 L198,261 L199,260 L203,260 L204,259 L208,259 L209,260 L213,260 L214,261 L216,261 L217,262 L218,262 L220,264 L221,264 L226,269 L226,270 L228,272 L228,273 L229,274 L229,277 L230,278 L230,286 L229,287 L229,289 L228,290 L228,291 L227,292 L226,295 L223,298 L223,299 L219,303 L216,303 L215,302 L215,301 L213,299 L213,298 L210,295 L210,294 L206,290 L206,289 L204,287 L203,287 L198,282 L197,282 L192,278 L191,278 L190,277 L189,277 L188,276 L185,275 L183,273 L184,270 Z" />
    </svg>
  );
}

function KitchenIcon() {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" fillRule="evenodd" className="h-full w-full" aria-hidden="true">
      <path d="M399,233 L399,241 L400,242 L401,251 L404,260 L409,269 L419,280 L432,287 L435,287 L439,289 L455,289 L456,288 L460,288 L470,284 L481,276 L487,269 L494,256 L497,246 L497,241 L498,240 L497,230 L493,227 L408,227 L407,228 L402,228 Z M408,238 L409,237 L487,237 L488,238 L488,240 L487,241 L486,249 L482,258 L480,260 L479,263 L468,274 L465,275 L463,277 L461,277 L457,279 L440,279 L439,278 L436,278 L433,276 L429,275 L427,273 L426,273 L418,265 L417,262 L412,255 L412,253 L409,246 L409,241 L408,240 Z M303,126 L294,134 L292,140 L294,153 L274,155 L261,161 L252,171 L246,187 L232,188 L225,193 L221,203 L222,210 L230,219 L247,222 L248,275 L255,289 L264,296 L278,301 L351,301 L361,299 L377,288 L383,276 L383,223 L386,220 L398,220 L405,217 L411,208 L410,197 L401,188 L385,187 L380,173 L368,160 L351,154 L337,154 L337,136 L330,128 L314,124 Z M383,197 L385,195 L391,195 L392,196 L395,196 L396,197 L397,197 L401,201 L401,207 L397,211 L396,211 L395,212 L389,212 L388,213 L386,213 L385,212 L384,212 L383,211 L383,208 L384,207 L384,201 L383,200 Z M256,196 L374,195 L374,272 L371,279 L363,287 L353,291 L280,291 L268,287 L262,281 L257,271 Z M235,197 L236,197 L237,196 L242,196 L243,195 L246,195 L248,197 L248,198 L247,199 L247,201 L248,202 L248,208 L247,209 L247,211 L245,213 L242,213 L241,212 L238,212 L237,211 L235,211 L231,207 L231,201 Z M257,183 L260,176 L263,172 L269,167 L275,164 L279,164 L280,163 L351,163 L352,164 L356,164 L362,167 L372,178 L374,183 L374,186 L373,187 L362,187 L361,186 L267,186 L266,187 L259,187 L257,185 Z M303,139 L307,135 L308,135 L309,134 L321,134 L322,135 L323,135 L324,136 L325,136 L326,137 L326,138 L328,140 L328,141 L329,142 L329,148 L328,149 L328,150 L329,151 L329,152 L327,154 L307,154 L306,153 L305,153 L304,152 L304,151 L303,150 L303,149 L302,148 L302,142 L303,141 Z" />
    </svg>
  );
}

function MushollaIcon() {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" fillRule="evenodd" className="h-full w-full" aria-hidden="true">
      <path d="M249,165 L238,169 L232,173 L223,185 L220,194 L220,212 L221,213 L221,216 L228,230 L240,240 L251,244 L256,244 L257,245 L272,244 L278,242 L288,236 L297,227 L300,219 L297,214 L292,214 L282,217 L275,216 L268,213 L260,205 L257,197 L257,186 L260,179 L264,175 L266,169 L263,165 L260,165 L259,164 Z M242,177 L250,173 L252,175 L250,179 L250,181 L249,182 L249,185 L248,186 L248,198 L249,199 L250,205 L256,215 L257,215 L258,217 L263,221 L265,221 L266,222 L268,222 L272,224 L278,224 L279,225 L285,224 L286,225 L286,227 L285,228 L271,235 L263,235 L262,236 L261,235 L253,235 L252,234 L247,233 L242,230 L234,222 L232,218 L232,216 L230,213 L230,209 L229,208 L229,197 L230,196 L230,193 L231,192 L231,190 L233,186 Z M253,83 L228,114 L194,135 L182,146 L172,161 L167,187 L157,191 L149,199 L144,213 L145,295 L143,299 L133,301 L133,308 L378,309 L381,302 L369,298 L369,214 L364,200 L345,186 L341,163 L329,144 L285,114 L259,82 Z M256,97 L276,119 L309,140 L325,155 L333,170 L336,193 L350,199 L358,210 L359,298 L357,300 L154,298 L154,212 L157,205 L164,198 L176,193 L178,173 L188,154 L202,141 L239,117 Z" />
    </svg>
  );
}

function ToiletIcon() {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" fillRule="evenodd" className="h-full w-full" aria-hidden="true">
      <path d="M259,175 L249,178 L239,187 L231,207 L214,264 L216,269 L222,273 L243,275 L244,311 L251,319 L255,321 L266,322 L276,320 L281,316 L284,311 L284,276 L287,273 L307,273 L312,269 L314,262 L289,188 L283,181 L278,178 L266,175 Z M254,273 L256,273 L257,274 L272,274 L273,273 L274,273 L276,275 L276,303 L275,304 L275,307 L271,311 L270,311 L269,312 L258,312 L257,311 L256,311 L253,308 L253,307 L252,306 L252,277 L251,276 Z M256,185 L259,185 L260,184 L271,185 L280,193 L286,206 L286,209 L303,258 L303,263 L302,264 L237,264 L236,265 L227,265 L224,262 L245,197 L247,193 Z M101,172 L94,175 L88,181 L85,188 L85,254 L90,261 L101,265 L101,310 L103,314 L108,319 L113,321 L139,321 L147,315 L149,309 L148,266 L150,264 L155,264 L161,261 L165,253 L165,189 L161,180 L154,174 L148,172 Z M104,181 L144,181 L148,182 L155,190 L155,253 L149,255 L142,254 L139,258 L139,307 L134,312 L115,312 L111,308 L110,305 L110,257 L106,254 L97,254 L95,251 L95,190 L96,187 Z M253,120 L252,121 L249,122 L247,124 L246,124 L242,128 L242,129 L239,133 L239,135 L238,136 L238,138 L237,139 L237,148 L238,149 L238,152 L239,153 L241,158 L247,164 L248,164 L250,166 L252,166 L255,168 L270,168 L271,167 L274,167 L275,166 L278,165 L285,158 L285,157 L287,154 L287,152 L288,151 L288,148 L289,147 L289,142 L288,141 L288,137 L287,136 L287,134 L284,130 L284,129 L278,123 L277,123 L272,120 L270,120 L269,119 L256,119 L255,120 Z M258,128 L267,128 L268,129 L270,129 L272,131 L273,131 L277,135 L277,136 L278,137 L278,138 L279,139 L279,148 L278,149 L278,151 L276,153 L276,154 L274,156 L273,156 L271,158 L270,158 L269,159 L264,159 L263,160 L262,160 L261,159 L257,159 L256,158 L254,158 L249,153 L249,152 L247,150 L247,149 L246,148 L246,140 L247,139 L247,137 L254,130 L255,130 L256,129 L257,129 Z M117,117 L116,118 L111,120 L105,126 L105,127 L102,131 L102,133 L101,134 L101,146 L102,147 L102,149 L105,153 L105,154 L111,160 L112,160 L115,162 L117,162 L118,163 L121,163 L122,164 L131,164 L132,163 L137,162 L139,160 L142,159 L146,155 L146,154 L149,150 L149,148 L150,147 L150,143 L151,142 L151,137 L150,136 L150,133 L149,132 L149,130 L144,123 L143,123 L140,120 L139,120 L134,117 L132,117 L131,116 L122,116 L121,117 Z M122,125 L130,125 L131,126 L132,126 L133,127 L134,127 L136,129 L137,129 L138,130 L138,131 L140,133 L140,134 L141,135 L141,144 L140,145 L140,147 L134,153 L133,153 L132,154 L131,154 L130,155 L122,155 L121,154 L119,154 L118,153 L117,153 L112,148 L112,147 L111,146 L111,145 L110,144 L110,136 L111,135 L111,134 L112,133 L112,132 L117,127 L118,127 L119,126 L121,126 Z M192,114 L189,117 L189,319 L195,322 L199,319 L199,117 L196,114 Z" />
    </svg>
  );
}

const FACILITIES = [
  {
    key: "classroom",
    label: "Ruang Kelas",
    Icon: ClassroomIcon,
    description:
      "Ruang kelas dirancang hangat dan aman dengan pencahayaan alami, AC, karpet bermain, dan media belajar yang merangsang kreativitas anak.",
  },
  {
    key: "playground",
    label: "Playground",
    Icon: PlaygroundIcon,
    description:
      "Area bermain outdoor yang aman dan menyenangkan untuk melatih motorik dan keberanian anak.",
  },
  {
    key: "playroom",
    label: "Playroom",
    Icon: PlayroomIcon,
    description:
      "Ruang bermain indoor dengan koleksi mainan edukatif untuk menstimulasi imajinasi dan kemampuan sosial anak.",
  },
  {
    key: "kitchen",
    label: "Kitchen Area",
    Icon: KitchenIcon,
    description:
      "Dapur mini untuk mengenalkan kebiasaan makan sehat dan kemandirian anak sejak dini.",
  },
  {
    key: "musholla",
    label: "Musholla",
    Icon: MushollaIcon,
    description:
      "Musholla anak untuk membiasakan ibadah dan kecintaan pada Al-Qur'an sejak usia dini.",
  },
  {
    key: "toilet",
    label: "Toilet",
    Icon: ToiletIcon,
    description:
      "Toilet ramah anak yang bersih dan aman untuk melatih kemandirian dalam kebersihan diri.",
  },
] ;

const PHOTOS_PER_TAB = 4;
const AUTO_ADVANCE_MS = 3000;

// Section 3 — "Fasilitas Kami". Left = tab changer, middle (widest) =
// photo (flush top/bottom, no margin), right = name/description + a
// 4-dot navigator. Each tab has 4 photos that auto-advance every 3s and
// can also be picked directly via the navigator; switching tabs resets
// back to photo 1. Photos are placeholders for now — no real facility
// photos supplied yet.
export default function FacilitiesSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    setActivePhoto(0);
  }, [activeTab]);

  useEffect(() => {
    const id = setInterval(() => {
      setActivePhoto((p) => (p + 1) % PHOTOS_PER_TAB);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [activeTab]);

  const facility = FACILITIES[activeTab];

  return (
    <section className="bg-ivory px-6 py-14">
      {/* `fr` isn't valid inside calc() in any current browser (confirmed
          empirically — the whole declaration gets rejected and the grid
          silently falls back to a single column), so the 1:1.6:1 ratio is
          expressed as percentages here instead, which calc() DOES support
          mixing with cm. Also needs a plain scoped <style> tag rather than
          a Tailwind utility class: Tailwind v4's arbitrary-property parser
          can't handle a value with multiple top-level calc() functions
          either (it silently emits an empty rule). */}
      <style>{`
        @media (min-width: 40rem) {
          .facilities-grid {
            grid-template-columns:
              calc(27.7778% - 2cm)
              calc(44.4444% + 4cm)
              calc(27.7778% - 2cm);
          }
        }
      `}</style>
      <div className="mx-auto" style={{ maxWidth: "calc(72rem + 6cm)" }}>
        <Reveal>
        <SectionBox>
          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-center gap-3">
              <ScallopBadge n={3} />
              <h2 className="font-heading text-2xl text-navy sm:text-3xl">Fasilitas Kami</h2>
            </div>

            <div className="facilities-grid mt-[1cm] grid gap-6 sm:items-stretch">
              {/* Left — tab changer */}
              <div className="flex flex-col gap-2">
                {FACILITIES.map((f, i) => {
                  const isActive = i === activeTab;
                  return (
                    <button
                      key={f.key}
                      type="button"
                      onClick={() => setActiveTab(i)}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-navy text-white shadow-md"
                          : "text-navy/70 hover:bg-navy/5"
                      }`}
                    >
                      <span className={`h-10 w-10 shrink-0 ${isActive ? "text-gold" : "text-navy/50"}`}>
                        <f.Icon />
                      </span>
                      {f.label}
                    </button>
                  );
                })}
              </div>

              {/* Middle — photo, flush top/bottom (no margin) */}
              <div className="relative min-h-[260px] w-full overflow-hidden rounded-2xl sm:min-h-full">
                <ImagePlaceholder
                  key={`${facility.key}-${activePhoto}`}
                  label={`[ISI: Foto ${facility.label} #${activePhoto + 1}]`}
                  className="h-full w-full"
                />
              </div>

              {/* Right — name, description, 4-dot navigator */}
              <div className="flex flex-col justify-center">
                <h3 className="font-heading text-xl text-navy">{facility.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-navy/70">{facility.description}</p>

                <div className="mt-6 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    aria-label="Foto sebelumnya"
                    onClick={() => setActivePhoto((p) => (p - 1 + PHOTOS_PER_TAB) % PHOTOS_PER_TAB)}
                    className="text-navy/40 transition-colors hover:text-navy"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: PHOTOS_PER_TAB }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Foto ${i + 1}`}
                        onClick={() => setActivePhoto(i)}
                        className={`h-2.5 rounded-full transition-all ${
                          i === activePhoto ? "w-6 bg-gold" : "w-2.5 bg-navy/15"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    aria-label="Foto berikutnya"
                    onClick={() => setActivePhoto((p) => (p + 1) % PHOTOS_PER_TAB)}
                    className="text-navy/40 transition-colors hover:text-navy"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SectionBox>
        </Reveal>
      </div>
    </section>
  );
}
